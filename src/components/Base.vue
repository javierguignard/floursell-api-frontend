<template>
  <div div="base">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  name: "Base",
  components: {
    Navbar
  },
  methods: {
  },
  mounted() {
    if (localStorage.getItem("key") == null) {
      this.$router.push({ name: "login" });
    }
  },  
};
</script>
