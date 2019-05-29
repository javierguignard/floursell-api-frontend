<template>
  <div id="AddSell">
    <el-row type="flex" justify="center">
      <h1>ABM Venta | {{client.name}}</h1>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Fecha</p>
          </el-col>
          <el-col :span="18">
            <el-date-picker v-model="date" style="width:100%"></el-date-picker>
          </el-col>
        </el-row>
        <div v-if="products">
          <el-row type="flex" justify="center" v-for="(item,index) in products" :key="index">
            <el-col :span="12">
              <p>{{item.title}}</p>
            </el-col>
            <el-col :span="18">
              <div v-if="sell != null">
                <el-row>
                  <el-col :span="12">
                    <el-input-number
                      :controls="false"
                      style="width:80%"
                      v-model="sell.items[index].quantity"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="12">
                    $ <el-input-number
                      style="width:80%"
                      :controls="false"
                      v-model="sell.items[index].amount"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </div>
              <div v-else>
                <el-row>
                  <el-col :span="12">
                    <el-input-number
                      :controls="false"
                      style="width:80%"
                      v-model="products[index].quantity"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="12">
                    $ <el-input-number
                      style="width:80%"
                      :controls="false"
                      v-model="products[index].amount"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex" justify="space-between" style="margin-top:5px;">
          <el-button v-if="sellID" style="width:100%;" @click="borrar()" type="danger">Eliminar</el-button>
          <el-button style="width:100%;" @click="submit()" type="success">Guardar</el-button>
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:15px">
      <el-card style="width:100%">
        <el-row><el-button style="width:100%" @click="move('AddPayment')" type="primary">+ Pago</el-button></el-row>
        <br>
        <el-row><el-button style="width:100%" @click="move('ClientSells')" type="danger">Volver</el-button></el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddSell",
  data() {
    return {
      date: Date(),
      clientID: localStorage.getItem("clientID"),
      client: null,
      sellID: localStorage.getItem("sellID"),
      products: [],
      sell: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    postItems(type) {
      var items = [];
      var x;
      if (type == 1) {
        for (x in this.sell.items) {
          items.push({
            quantity: this.sell.items[x].quantity,
            amount: this.sell.items[x].amount,
            product: this.sell.items[x].product
          });
        }
      } else {
        for (x in this.products) {
          items.push({
            quantity: this.products[x].quantity,
            amount: this.products[x].amount,
            product: this.products[x].id
          });
        }
      }
      return items;
    },
    submit() {
      if (this.sell) {
        axios
          .put(
            "http://127.0.0.1:8000/api/sell/" + this.sellID + "/",
            {
              items: this.postItems(1),
              status: 1,
              created_by: null,
              customer: this.clientID,
              creation_date: this.date
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
              message: "Venta modificada con exito",
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
            "http://127.0.0.1:8000/api/sell/",
            {
              items: this.postItems(2),
              status: 1,
              created_by: null,
              customer: this.clientID,
              creation_date: this.date
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
              message: "Venta creada con exito",
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
          "http://127.0.0.1:8000/api/sell/" +
            localStorage.getItem("sellID") +
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
            message: "Venta eliminada con exito",
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
    axios
      .get("http://127.0.0.1:8000/api/product/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(res => {
        var x;
        for (x in res.data) {
          this.products.push({
            id: res.data[x].id,
            title: res.data[x].title,
            quantity: 0,
            amount: 0.0
          });
        }
      });
    if (localStorage.getItem("sellID")) {
      axios
        .get(
          "http://127.0.0.1:8000/api/sell/" +
            localStorage.getItem("sellID") +
            "/",
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        )
        .then(response => (this.sell = response.data));
    }
  }
};
</script>