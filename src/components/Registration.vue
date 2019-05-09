<template>
  <div id="registration">
    <form @submit.prevent="submit">
      <el-input v-model="username" type="text"/>
      <el-input v-model="email" type="email"/>
      <el-input v-model="password1" type="password"/>
      <el-input v-model="password2" type="password"/>
      <el-button type="primary" native-type="submit">Submit</el-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Registration',
  data() {
    return {
      username: "yosoyyo4",
      email: null,
      password1: "pepe1234",
      password2: "pepe1234"
    }
  },
  methods: {
    submit() {
      axios.post('http://127.0.0.1:8000/registration/', {
        username: this.username,
        password1: this.password1,
        password2: this.password2
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  },
}
</script>
