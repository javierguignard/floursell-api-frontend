<template>
  <div id="ClientSells">
    <el-row type="flex" justify="center">
      <h1>Cta cte {{client.name}}</h1>
    </el-row>
    <el-card>
      <el-row type="flex" justify="space-between">
        <p>Ventas:</p>
        <p>Saldo: $000.00</p>
      </el-row>
      <table v-for="(sell, x) in sells" :key="x">
        <tr>
          <td
            style="border: 1px solid black; background-color:grey;"
            v-if="(sell.customer == clientID)"
          >
            <p v-for="(item, hola) in sell.items" :key="hola">{{item.product}} ${{item.amount}}</p>
            {{sell.creation_date}}
          </td>
        </tr>
      </table>

      <el-row>
        <p>Pagos:</p>
      </el-row>
      <table v-for="(payment, y) in payments" :key="y">
        <tr v-if="(payment.customer == clientID)">
          <td style="border: 1px solid black; background-color:grey;">
            <p>$ {{payment.amount}}</p>
            {{payment.creation_date}}
          </td>
        </tr>
      </table>
    </el-card>
    <br>
    <el-row type="flex" justify="end">
      <el-button @click="move('AddPayment')" type="primary">+ pago</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ClientSells",
  data() {
    return {
      clientID: localStorage.getItem("clientID"),
      client: null,
      sells: null,
      payments: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    }
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

    axios
      .get("http://127.0.0.1:8000/api/sell/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => (this.sells = response.data));

    axios
      .get("http://127.0.0.1:8000/api/payment/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => {
        this.payments = response.data;
        localStorage.setItem("userID", response.data[0].created_by);
      });
  }
};
</script>

