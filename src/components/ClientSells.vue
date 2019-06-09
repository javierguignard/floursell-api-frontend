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
      <table style="width:100%; border: 1px solid black" v-for="(sell, x) in sells" :key="x">
        <tr v-if="(sell.customer == clientID)">
          <h1 hidden="true">{{result = 0}}</h1>
          <td>
            <p
              hidden="true"
              v-for="(item, hola) in sell.items"
              :key="hola"
            >{{item.product}} ${{result+=(item.amount*item.quantity)}}</p>
            <p>$ {{result}}</p>
            {{sell.creation_date.substring(0, 10)}}
          </td>
          <td>
            <el-button @click="moveWithSellID(sell.id, 'AddSell')">
              <eye/>
            </el-button>
          </td>
        </tr>
      </table>

      <el-row>
        <p>Pagos:</p>
      </el-row>
      <table style="width:100%; border: 1px solid black;" v-for="(payment, y) in payments" :key="y">
        <tr v-if="(payment.customer == clientID)">
          <td>
            <p>$ {{payment.amount}}</p>
            {{payment.creation_date.substring(0, 10)}}
          </td>
          <el-button @click="moveWithPaymentID(payment.id, 'AddPayment')">
            <eye/>
          </el-button>
        </tr>
      </table>
    </el-card>
    <br>
    <el-card style="margin-top:20px">
      <el-row style="margin-bottom:5px;"><el-button style="width:100%" @click="move('AddPayment')" type="primary">+ pago</el-button></el-row>
      <el-row style="margin-bottom:5px;"><el-button style="width:100%" @click="move('AddSell')" type="primary">+ Venta</el-button></el-row>
      <el-row><el-button style="width:100%" type="danger" @click="move('client')">Volver</el-button></el-row>
    </el-card>
  </div>
</template>

<script>
import {HTTP} from "./ApiConnection";
import eye from "vue-material-design-icons/Eye.vue";
export default {
  name: "ClientSells",
  components: {
    eye
  },
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
    },
    moveWithPaymentID(paymentID, route){
      localStorage.setItem("paymentID", paymentID)
      this.$router.push({name: route})
    },
    moveWithSellID(paymentID, route){
      localStorage.setItem("sellID", paymentID)
      this.$router.push({name: route})
    }
  },
  beforeCreate() {
    localStorage.removeItem("sellID")
    localStorage.removeItem("paymentID")
    localStorage.removeItem("orderID")
    HTTP
      .get(
        "customer/" +
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

    HTTP
      .get("sell/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => (this.sells = response.data));

    HTTP
      .get("payment/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => {
        this.payments = response.data;
        localStorage.setItem("userID", response.data[0].created_by);
      });
  }
};
</script>

