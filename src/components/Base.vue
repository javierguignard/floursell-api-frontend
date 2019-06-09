<template>
  <div div="base">
    <Navbar/>
    <el-row  justify="center" gutter="0" >
      <el-col :xs="24" :md="12" class="el-col-md-offset-6">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navbar from "./Navbar";
//import {HTTP} from "./ApiConnection";
import HTTP from "./ApiConnection"

export default {
  name: "Base",
  components: {
    Navbar
  },
  methods: {
  },
  created() {
    HTTP
      .get("/api/user_type/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then((response) =>{if (response.data[0].account.user_type == 1){
        this.$router.push({ name: "productionOrders" });
      }});
  },
  mounted() {
    if (localStorage.getItem("key") == null) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
