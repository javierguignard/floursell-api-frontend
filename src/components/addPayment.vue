<template>
  <div id="AddPayment">
    <el-row type="flex" justify="center">
      <div v-for="(client, index) in clients" :key="index">
        <div v-if="client.id == clientID">
          <h1>Agregar pago | Cliente: {{client.name}}</h1>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Fecha</p>
          </el-col>
          <el-col :span="18">
            <el-date-picker :disabled="true" v-model="date" style="width:100%"></el-date-picker>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Monto</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="amount" style="width:100%"></el-input>
          </el-col>
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
  name: "AddPayment",
  data() {
    return {
      clientID: localStorage.getItem("clientID"),
      date: Date(),
      amount: null,
      clients: null
    };
  },
  methods: {
    submit() {
      axios
        .post(
          "http://127.0.0.1:8000/api/payment/",
          {
            amount: this.amount,
            created_by: null,
            customer: this.clientID
          },
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        )
        .then(this.$message({
            showClose: true,
            message: "Pago creado con exito",
            type: "success"
          }))
        .catch(err =>
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          })
        );
    }
  },
  beforeCreate() {
    axios
      .get("http://127.0.0.1:8000/api/customer/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => (this.clients = response.data))
      .catch(err =>
        this.$message({
          showClose: true,
          message: err,
          type: "error"
        })
      );
  }
};
</script>