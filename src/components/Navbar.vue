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
        <el-menu-item v-if="(userType == 2 || userType == 0)" @click="move('client')">
          <accountBox style="height:9px;"/> Clientes
        </el-menu-item>
        <el-menu-item @click="move('order')" v-if="(userType == 2 || userType == 0)">
          <truckFast style="height:9px;"/> Pedidos
        </el-menu-item>
        <el-menu-item  v-if="(userType == 2 || userType == 1)" @click="move('productionOrders')">
          <bread style="height:6px;"/> Producción
        </el-menu-item>
        <el-divider></el-divider>
        <el-menu-item   @click="logOut()">
          <logout style="height:6px;"/> Salir
        </el-menu-item>
      </el-submenu>
      <el-menu-item>
        <pizza style="height:9px;" :size="25"/>FlourSell
      </el-menu-item>
      <!--<el-menu-item class="dock-right" @click="logOut()">-->
        <!--<logout style="height:15px;"/>-->
      <!--</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";
import pizza from "vue-material-design-icons/Pizza.vue";
import logout from "vue-material-design-icons/Logout.vue";
import accountBox from "vue-material-design-icons/AccountBox.vue";
import truckFast from "vue-material-design-icons/TruckFast.vue";
import bread from "vue-material-design-icons/BreadSlice.vue";
//import {HTTP} from "./ApiConnection";
import {HTTP} from "./ApiConnection"

export default {
  name: "Navbar",
  components: {
    MenuIcon,
    pizza,
    logout,
    accountBox,
    truckFast,
    bread
  },
  data() {
    return {
      userType: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    logOut() {
      localStorage.removeItem("key");
      this.move("login");
    }
  },
  created() {
      HTTP
      .get("user_type/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then((response) => this.userType = response.data[0].account.user_type)
      .catch((err) =>
        this.$message({
          showClose: true,
          message: err,
          type: "error"
        })
      );
  }
};
</script>

<style lang="scss" scoped>
  .el-menu-horizontal > .el-menu-item.dock-right{
    float: right;
  }

</style>