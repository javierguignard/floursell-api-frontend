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
                <p>Telefono: {{tableDataClients[index2]["phone"]}}</p>
              </div>
            </div>
          </th>
          <th style=" width:35%">
            <el-button @click="clientSells(x.customer)">
              <cart/>
            </el-button>
            <el-button>
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
    clientSells(id){
      localStorage.setItem("clientID", id)
      this.move("ClientSells")
    },
  },
  beforeCreate() {
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
