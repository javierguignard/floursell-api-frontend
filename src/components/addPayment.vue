<template>
  <div id="AddPayment">
    <el-row type="flex" justify="center">
      <h1>ABM Pago | {{client.name}}</h1>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Fecha</p>
          </el-col>
          <el-col :span="18">
            <el-date-picker
              v-if="payment != null"
              v-model="payment.creation_date"
              style="width:100%"
            ></el-date-picker>
            <el-date-picker v-else v-model="date" style="width:100%"></el-date-picker>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Monto</p>
          </el-col>
          <el-col :span="18">
            <el-input v-if="payment != null" v-model="payment.amount" style="width:100%"></el-input>
            <el-input v-else v-model="amount" style="width:100%"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" style="margin-top:5px;">
          <el-button v-if="(payment)" @click="borrar()" style="width:100%;" type="danger">Eliminar</el-button>
          <el-button style="width:100%;" @click="submit()" type="success">Guardar</el-button>
        </el-row>
      </el-card>
    </el-row>
    <el-card style="margin-top:20px">
      <el-row>
        <el-button style="width:100%" type="danger" @click="move('ClientSells')">Volver</el-button>
      </el-row>
    </el-card>
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
      client: null,
      payment: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    submit() {
      if (localStorage.getItem("paymentID")) {
        axios
          .put(
            "http://127.0.0.1:8000/api/payment/" +
              localStorage.getItem("paymentID") +
              "/",
            {
              id: this.payment.id,
              creation_date: this.payment.creation_date,
              last_modification_date: new Date(),
              amount: this.payment.amount,
              created_by: this.payment.created_by,
              customer: this.payment.customer
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
              message: "Pago modificado con exito",
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
      } else {
        axios
          .post(
            "http://127.0.0.1:8000/api/payment/",
            {
              amount: this.amount,
              created_by: null,
              customer: this.clientID,
              creation_date: this.date,
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
              message: "Pago creado con exito",
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
          "http://127.0.0.1:8000/api/payment/" +
            localStorage.getItem("paymentID") +
            "/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("key")} `
            }
          }
        )
        .then(() =>{
          this.$message({
            showClose: true,
            message: "Pago Eliminado con exito",
            type: "warning"
          });
          this.move("ClientSells");
        })
        .catch(err =>
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          })
        );
    },
  },
  beforeCreate() {
    axios
      .get(
        "http://127.0.0.1:8000/api/customer/" +
          localStorage.getItem("clientID") +
          "/",
        {
          headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
        }
      )
      .then(response => (this.client = response.data))
      .catch(err =>
        this.$message({
          showClose: true,
          message: err,
          type: "error"
        })
      );

    if (localStorage.getItem("paymentID")) {
      axios
        .get(
          "http://127.0.0.1:8000/api/payment/" +
            localStorage.getItem("paymentID") +
            "/",
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        )
        .then(response => (this.payment = response.data))
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