<template>
  <div id="orders">
    <el-row type="flex" justify="center">
      <h1>Pedidos</h1>
    </el-row>

    <el-row>
      <el-input placeholder="Buscar cliente por nombre">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
    <br>
    <el-row>
      <table style="width:100%; background-color:white; border-collapse: collapse;">
        <tr class="tr" v-for="(x, index) in tableData" :key="index">
          <th style="">
            <div v-for="(y, index2) in tableDataClients" :key="index2">
              <div v-if="(x.customer == y.id)">
                <p>{{tableDataClients[index2]["name"]}}</p>
                <p>{{tableData[index]["creation_date"].substring(0, 10)}}</p>
              </div>
            </div>
          </th>
          <th style=" width:35%">
            <el-button @click="moveWithID(x.customer, 'AddSell')">
              <cart/>
            </el-button>
            <el-button @click="moveWithOrderID(x.id, 'AddOrder')">
              <eye/>
            </el-button>
          </th>
        </tr>
      </table>
    </el-row>
    <br>
    <el-row type="flex" justify="end">
      <el-button @click="move('AddOrder')" style="margin-top: 10px" type="primary">
        <i class="el-icon-plus"></i>
        Nuevo
      </el-button>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import cart from "vue-material-design-icons/CartOutline.vue";
import eye from "vue-material-design-icons/Eye.vue";
export default {
  name: "orders",
  components: {
    cart,
    eye
  },
  data() {
    return {
      tableData: null,
      tableDataClients: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    moveWithID(id, route) {
      localStorage.setItem("clientID", id);
      this.move(route);
    },
    moveWithOrderID(id, route) {
      localStorage.setItem("orderID", id);
      this.move(route);
    },
  },
  beforeCreate() {
    localStorage.removeItem("clientID");
    localStorage.removeItem("sellID");
    localStorage.removeItem("paymentID");
    localStorage.removeItem("orderID")
    axios
      .get("http://127.0.0.1:8000/api/order/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => (this.tableData = response.data));
    axios
      .get("http://127.0.0.1:8000/api/customer/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => (this.tableDataClients = response.data));

    if (localStorage.getItem("key") == null) {
      window.location.replace("/templates/login.html");
    }
  }
};
</script>
