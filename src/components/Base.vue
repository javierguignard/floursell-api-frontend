<template>
  <div div="base">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import axios from "axios";

export default {
  name: "Base",
  components: {
    Navbar
  },
  methods: {
  },
  created() {
    axios
      .get("http://127.0.0.1:8000/api/user_type/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response =>{if (response.data[0].account.user_type == 1){
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
