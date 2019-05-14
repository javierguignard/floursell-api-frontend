<template>
  <div id="login">
    <el-row type="flex" justify="center">
      <h1>Login</h1>
    </el-row>
    <el-row>
      <el-card>
        <form @submit.prevent="submit">
          <div>
            Usuario:
            <el-input type="text" v-model="username"></el-input>
          </div>
          <div>
            Contraseña:
            <el-input type="password" v-model="password"></el-input>
          </div>
          <br>
          <el-col>
            <el-button
              style="width:100%; margin-bottom:15px"
              native-type="submit"
              type="primary">Iniciar Sesion</el-button>
          </el-col>
        </form>
      </el-card>
    </el-row>
    <br>
    <el-row>
      <el-card>
        <p>¿No te has registrado todavia?</p>
        <el-row type="flex">
          <el-button style="width: 100%" type="warning" @click="move('registration')">Registrarse!</el-button>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    submit() {
      axios
        .post("http://127.0.0.1:8000/auth/login/", {
          username: this.username,
          email:"",
          password: this.password,
        })
        .then(res =>{
          localStorage.setItem('key', res.data.key)
          if (res.data.key){
            this.move("client")
          }
        })
        .catch(err =>
          this.$message({
            showClose: true,
            message: "Usuario y/o Contraseña incorrectas",
            type: "error"
          })
        );
    }
  }
};
</script>
