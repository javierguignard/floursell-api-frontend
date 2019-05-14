<template>
  <div id="AddClient">
    <el-row type="flex" justify="center">
      <h1>Agregar Cliente</h1>
    </el-row>
    <el-row>
      <el-card class="box-card">
        Nombre
        <el-input v-model="name"></el-input>Direccion
        <el-input v-model="address"></el-input>Telefono
        <el-input v-model="phone"></el-input>E-mail
        <el-input v-model="email"></el-input>Observaciones
        <el-input v-model="observations"></el-input>
        <el-row type="flex" justify="center" style="margin-top:20px;">
          <el-button style="width:100%">
            Cuenta Corriente
            <i class="el-icon-view el-icon-right"></i>
          </el-button>
        </el-row>
        <el-row type="flex" justify="space-between" style="margin-top:5px;">
          <el-button style="width:100%;" type="danger">Eliminar</el-button>
          <el-button style="width:100%;" @click="submit()" type="success">Guardar</el-button>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddClient",
  data() {
    return {
      name: null,
      address: null,
      phone: null,
      email: null,
      observations: null
    };
  },
  methods: {
    submit() {
      axios
        .post(
          "http://127.0.0.1:8000/api/customer/",
          {
            name: this.name,
            address: this.address,
            phone: this.phone,
            email: this.email,
            observations: this.observations,
            created_by: 1
          },
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        )
        .then(
          this.$message({
            showClose: true,
            message: "Cliente creado con Exito",
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
    }
  }
};
</script>