<template>
  <div id="navbar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <menu-icon style="height:9px;"/>
        </template>
        <el-menu-item @click="move('client')">
          <accountBox style="height:9px;"/>Clientes
        </el-menu-item>
        <el-menu-item @click="move('order')">
          <truckFast style="height:9px;"/>Pedidos
        </el-menu-item>
        <el-menu-item @click="move('AddSell')">
          <money style="height:9px;"/>Ventas
        </el-menu-item>
        <el-menu-item @click="move('productionOrders')">
          <bread style="height:6px;"/>Produccion
        </el-menu-item>
      </el-submenu>
      <el-menu-item>
        <pizza style="height:9px;" :size="25"/>  FlourSell
      </el-menu-item>
      <el-menu-item @click="logOut()">
        <logout style="height:9px;"/>  Cerrar Sesion
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";
import pizza from "vue-material-design-icons/Pizza.vue";
import logout from "vue-material-design-icons/Logout.vue";
import accountBox from "vue-material-design-icons/AccountBox.vue";
import truckFast from "vue-material-design-icons/TruckFast.vue";
import money from "vue-material-design-icons/CurrencyUsd.vue";
import bread from "vue-material-design-icons/BreadSlice.vue";
export default {
  name: "Navbar",
  components: {
    MenuIcon,
    pizza,
    logout,
    accountBox,
    truckFast,
    money,
    bread
	},
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    logOut() {
      localStorage.removeItem("key");
      this.move("login");
    }
  }
};
</script>
