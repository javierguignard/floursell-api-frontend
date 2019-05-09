<template>
  <div id="login">
    <h1>Login</h1>
    <el-button @click="mover('client')">Log</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    mover(name) {
      this.$router.push({ name: name })
    }
  }
}
</script>
