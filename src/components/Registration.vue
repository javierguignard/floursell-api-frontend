<template>
  <div id="registration">
    <el-row type="flex" justify="center">
      <h1>Registrarse</h1>
    </el-row>
    <el-row>
      <el-card class="register-main-card">
        <form @submit.prevent="submit">
          <div class="div-data">
            Nuevo Usuario:
            <el-input type="text" v-model="username"></el-input>
          </div>
          <div class="div-data">
            Nuevo Email:
            <el-input type="email" v-model="email"></el-input>
          </div>
          <div class="div-data">
            Nueva Contraseña:
            <el-input type="password" v-model="password1"></el-input>
          </div>
          <div class="div-data">
            Repita la Nueva Contraseña:
            <el-input type="password" v-model="password2"></el-input>
          </div>
          <br>
          <el-row class="buttonCol">
            <el-button style="width:100%" native-type="submit" type="primary">Registrarse!</el-button>
          </el-row>
        </form>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="register-go-back-card">
        <el-button style="width:100%" type="danger" @click="move('login')">Volver</el-button>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {HTTP} from "./ApiConnection";

export default {
  name: "Registration",
  data() {
    return {
      username: null,
      email: null,
      password1: null,
      password2: null
    };
  },
  methods: {
    submit() {
      HTTP
        .post("http://127.0.0.1:8000/registration/", {
          username: this.username,
          password1: this.password1,
          password2: this.password2
        })
        .then(res =>
          this.$message({
            showClose: true,
            message: "Usuario registrado con exito!",
            type: "success"
          })
        )
        .catch(err =>
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          })
        );
    },
    move(route){
      this.$router.push({ name: route })
    }
  }
};
</script>