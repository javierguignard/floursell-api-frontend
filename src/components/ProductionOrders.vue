<template>
  <div id="productionOrders">
    <el-row type="flex" justify="center">
      <h1>ABM Pedidos</h1>
    </el-row>
    <br>
    <el-row>
      <el-card>
        <p>Fecha</p>
        <el-row type="flex" justify="flex-start" style="margin-bottom:20px">
          <el-date-picker v-model="date" type="date" style="width:80%" placeholder="Pick a day"></el-date-picker>
          <el-button @click="update()"><Magnify /></el-button>
        </el-row>
        <el-row type="flex" justify="center" v-for="(item,index) in products" :key="index">
          <el-col>
            <p>{{item.title}}</p>
          </el-col>
          <el-col>
            <p style="margin-left:45%;">{{products[index].quantity}}</p>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-top:75px;">
      <el-card v-if="date != null">
        <el-button
          @click="moveWithDate('productionTemplate')"
          style="width:100%;"
        >Plantilla de produccion</el-button>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import {HTTP} from "./ApiConnection";
import Magnify from "vue-material-design-icons/Magnify.vue";
export default {
  name: "productionOrders",
  components: {
    Magnify
  },

  data() {
    return {
      products: [],
      orders: null,
      date: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    moveWithDate(route) {
      localStorage.setItem("date", this.getMyDate());
      this.$router.push({ name: route });
    },
    getMyDate() {
      var myDay;
      var myMonth;
      var myYear;
      if (this.date.getDate().toString().length == 1) {
        myDay = "0" + this.date.getDate();
      } else {
        myDay = this.date.getDate();
      }
      if ((this.date.getMonth() + 1).toString().length == 1) {
        myMonth = "0" + (this.date.getMonth() + 1);
      } else {
        myMonth = this.date.getMonth() + 1;
      }
      myYear = this.date.getFullYear();
      return myYear + "-" + myMonth + "-" + myDay;
    },
    update() {
      var x;
      var y;
      var z;
      for (z in this.products) {
        this.products[z].quantity = 0;
      }
      for (x in this.orders) {
        if (this.orders[x].creation_date.substring(0, 10) == this.getMyDate()) {
          for (y in this.orders[x].items) {
            if (this.orders[x].items[y].product == this.products[y].id) {
              this.products[y].quantity += this.orders[x].items[y].quantity;
            }
          }
        }
      }
    }
  },
  beforeCreate() {
    localStorage.removeItem("clientID");
    localStorage.removeItem("sellID");
    localStorage.removeItem("paymentID");
    localStorage.removeItem("orderID");
    localStorage.removeItem("date");
    HTTP
      .get("product/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(res => {
        var x;
        for (x in res.data) {
          this.products.push({
            id: res.data[x].id,
            title: res.data[x].title,
            quantity: 0
          });
        }
      });

    HTTP
      .get("productionOrder/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(res => (this.orders = res.data));
  }
};
</script>
