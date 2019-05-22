<template>
  <div id="AddClient">
    <el-row type="flex" justify="center">
      <h1>ABM Cliente</h1>
    </el-row>
    <el-row>
      <el-card class="box-card">
        Nombre
        <el-input v-model="client.name"></el-input>Direccion
        <el-input v-model="client.address"></el-input>Telefono
        <el-input v-model="client.phone"></el-input>E-mail
        <el-input v-model="client.email"></el-input>Observaciones
        <el-input v-model="client.observations"></el-input>
        <el-row v-if="(clientID!=null)" type="flex" justify="center" style="margin-top:20px;">
          <el-button style="width:100%">
            Cuenta Corriente
            <i class="el-icon-view el-icon-right"></i>
          </el-button>
        </el-row>
        <el-row type="flex" justify="space-between" style="margin-top:20px;">
          <el-button
            v-if="(clientID!=null)"
            @click="borrar()"
            style="width:100%;"
            type="danger"
          >Eliminar</el-button>
          <el-button style="width:100%;" @click="submit()" type="success">Guardar</el-button>
        </el-row>
      </el-card>
    </el-row>
    <br>
    <el-row>
      <el-card>
        <el-button style="width:100%" type="danger" @click="move('client')">Volver</el-button>
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
      clientID: localStorage.getItem("clientID"),
      client: {
        name: null,
        address: null,
        phone: null,
        email: null,
        observations: null
      }
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    submit() {
      if (localStorage.getItem("clientID")) {
        axios
          .put(
            "http://127.0.0.1:8000/api/customer/" +
              localStorage.getItem("clientID") +
              "/",
            {
              name: this.client.name,
              address: this.client.address,
              phone: this.client.phone,
              email: this.client.email,
              observations: this.client.observations,
              created_by: 1
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("key")} `
              }
            }
          )
          .then(
            this.$message({
              showClose: true,
              message: "Cliente Modificado con Exito",
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
      } else {
        axios
          .post(
            "http://127.0.0.1:8000/api/customer/",
            {
              name: this.client.name,
              address: this.client.address,
              phone: this.client.phone,
              email: this.client.email,
              observations: this.client.observations,
              created_by: 1
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("key")} `
              }
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
    },
    borrar() {
      axios
        .delete(
          "http://127.0.0.1:8000/api/customer/" +
            localStorage.getItem("clientID") +
            "/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("key")} `
            }
          }
        )
        .then(
          this.$message({
            showClose: true,
            message: "Cliente Borrado con Exito",
            type: "warning"
          })
        )
        .catch(err =>
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          })
        );
        this.move('client')
    }
  },
  beforeCreate() {
    if (localStorage.getItem("clientID")) {
      axios
        .get(
          "http://127.0.0.1:8000/api/customer/" +
            localStorage.getItem("clientID") +
            "/",
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        )
        .then(res => {
          (this.client.name = res.data.name),
            (this.client.address = res.data.address),
            (this.client.phone = res.data.phone),
            (this.client.email = res.data.email),
            (this.client.observations = res.data.observations);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>