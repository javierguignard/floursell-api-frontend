<template>
  <div id="orders">
    <el-row type="flex" justify="center">
      <h1>Pedidos</h1>
    </el-row>

    <el-row>
      <el-col :span="20">
        <el-date-picker v-model="date" type="date" style="width:100%" placeholder="Pick a day"></el-date-picker>
        <el-input v-model="search" placeholder="Buscar cliente por nombre"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button style="width:100%; height:80px" @click="filter()" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <table style="width:100%; background-color:white; border-collapse: collapse;">
        <tr class="tr" v-for="(x, index) in tableData" :key="index">
          <th style>
            <div v-for="(y, index2) in tableDataClients" :key="index2">
              <div v-if="(x.customerID == y.id)">
                <p>{{tableDataClients[index2]["name"]}}</p>
                <p>{{tableData[index]["creation_date"].substring(0, 10)}}</p>
              </div>
            </div>
          </th>
          <th style=" width:35%">
            <el-button @click="moveWithID(x.customerID, 'AddSell')">
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
import {HTTP} from "./ApiConnection";
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
      tableData: [],
      tableDataClients: [],
      clients: [],
      search: "",
      date: null,
      orders: []
    };
  },
  methods: {
    getMyDate() {
      let myDay;
      let myMonth;
      let myYear;
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
    filter() {
      let x;
      let y;
      if (this.search == "") {
        if (this.date == null) {
          this.tableData = this.orders;
          this.tableDataClients = this.clients;
        } else {
          this.tableData = [];
          this.tableDataClients = this.clients;
          for (x in this.orders) {
            if (
              this.orders[x].creation_date.substring(0, 10) == this.getMyDate()
            ) {
              this.tableData.push(this.orders[x]);
            }
          }
        }
      } else {
        if (this.date == null) {
          this.tableDataClients = [];
          this.tableData = []
          for (x in this.clients) {
            if (
              this.clients[x].name
                .toLowerCase()
                .includes(this.search.toLowerCase())
            ) {
              this.tableDataClients.push(this.clients[x])
            }
          }
          x = 0;
          for (x in this.orders){
            for (y in this.tableDataClients){
              if (this.orders[x].customerID == this.tableDataClients[y].id){
                this.tableData.push(this.orders[x])
              }
            }
          }
        }else{
          this.tableDataClients = [];
          this.tableData = []
          for (x in this.clients) {
            if (
              this.clients[x].name
                .toLowerCase()
                .includes(this.search.toLowerCase())
            ) {
              this.tableDataClients.push(this.clients[x])
            }
          }
          x = 0;
          for (x in this.orders) {
            if (
              this.orders[x].creation_date.substring(0, 10) == this.getMyDate()
            ) {
              for (y in this.tableDataClients)
              if (this.orders[x].customerID == this.tableDataClients[y].id){
                this.tableData.push(this.orders[x]);
              }
            }
          }
        }
      }
    }
  },
  beforeCreate() {
    let x;
    let y;
    localStorage.removeItem("clientID");
    localStorage.removeItem("sellID");
    localStorage.removeItem("paymentID");
    localStorage.removeItem("orderID");
    localStorage.removeItem("date");
    HTTP
      .get("order/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => {
        for (x in response.data) {
          this.tableData.push({
            id: response.data[x].id,
            customerID: response.data[x].customer,
            creation_date: response.data[x].creation_date
          });
          this.orders.push({
            id: response.data[x].id,
            customerID: response.data[x].customer,
            creation_date: response.data[x].creation_date
          });
        }
      });
    HTTP
      .get("customer/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => {
        for (y in response.data) {
          this.clients.push({
            name: response.data[y].name,
            id: response.data[y].id
          });
          this.tableDataClients.push({
            name: response.data[y].name,
            id: response.data[y].id
          });
        }
      });

    if (localStorage.getItem("key") == null) {
      window.location.replace("/templates/login.html");
    }
  }
};
</script>