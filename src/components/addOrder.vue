<template>
  <div id="AddOrder">
    <el-row type="flex" justify="center">
      <h1>AMB Pedido</h1>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <el-row type="flex" justify="space-around">
          <el-col :span="10">
            <p>Fecha</p>
          </el-col>
          <el-col :span="15">
            <el-date-picker v-model="date" style="width:100%"></el-date-picker>
          </el-col>
        </el-row>

        <el-row v-if="orderID" type="flex" justify="space-between">
          <el-col :span="10">
            <p>Cliente:</p>
          </el-col>
          <div v-for="(client, index) in clients" :key="index">
            <div v-if="order.customer == client.id">
              <el-col :span="24">
                <el-input :disabled="true" v-model="client.name" style="width:100%"></el-input>
              </el-col>
            </div>
          </div>
        </el-row>

        <el-row v-else>
          <el-col :span="10">
            <p>Cliente:</p>
          </el-col>
          <el-col :span="14">
            <el-select v-model="selectedClient" placeholder="Select">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :label="client.name"
                :value="client.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div v-if="products">
          <el-row type="flex" justify="center" v-for="(item,index) in products" :key=index>
            <el-col :span="12">
              <p>{{item.title}}</p>
            </el-col>
            <el-col :span="18">
              <div v-if="order != null">
                <div v-for="item2 in order.items" :key=item2.product>
                  <el-input-number :controls="false" v-if="item.id == item2.product" v-model="item2.quantity" style="width:100%"></el-input-number>
                </div>
              </div>
              <div v-else>
                <el-input-number :controls="false" v-model="products[index].quantity"></el-input-number>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-button @click="moveWithID(order.customer,'AddSell')" v-if="orderID" style="width:100%">Generar Venta</el-button>
        </el-row>
        <el-row type="flex" justify="space-between" style="margin-top:5px;">
          <el-button v-if="orderID" style="width:100%;" @click="borrar()" type="danger">Eliminar</el-button>
          <el-button style="width:100%;" @click="submit()" type="success">Guardar</el-button>
        </el-row>
      </el-card>
    </el-row>
    <el-row>
      <el-card style="margin-top:20px">
        <el-button style="width:100%" type="danger" @click="move('order')">Volver</el-button>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {HTTP} from "./ApiConnection";
export default {
  name: "AddOrder",
  data() {
    return {
      date: null,
      orderID: localStorage.getItem("orderID"),
      order: null,
      selectedClient: null,
      products: [],
      clients: null,
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    moveWithID(id, route) {
      localStorage.setItem("clientID", id);
      this.move(route);
    },
    borrar() {
      HTTP
        .delete(
          "order/" +
            localStorage.getItem("orderID") +
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
            message: "Orden Eliminada con exito",
            type: "warning"
          });
          this.move("order");
        })
        .catch(err =>
          this.$message({
            showClose: true,
            message: err,
            type: "error"
          })
        );
    },
    postItems(){
      var items = []
      var x
      for (x in this.products){
        items.push({product: this.products[x].id, quantity: this.products[x].quantity})
      }
      return items
    },
    submit() {
      if (this.orderID) {
        HTTP
          .put(
            "order/" +
              localStorage.getItem("orderID") +
              "/",
            {
              id: this.orderID,
              items: this.order.items,
              creation_date: this.date,
              last_modification_date: new Date(),
              created_by: this.order.created_by,
              customer: this.order.customer
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
              message: "Orden modificada con exito",
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
        HTTP
          .post(
            "order/",
            {
              items: this.postItems(),
              created_by: null,
              customer: this.selectedClient,
              creation_date: this.date,
              last_modification_date: new Date(),
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
              message: "Pedido creado con exito",
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
  },
  beforeCreate() {
    HTTP
      .get("customer/", {
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

    HTTP
      .get("product/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(res => {
        var x
        for (x in res.data){
          this.products.push({id: res.data[x].id, title: res.data[x].title, quantity: 0})
        }
      });

    if (localStorage.getItem("orderID")) {
      HTTP
        .get(
          "order/" +
            localStorage.getItem("orderID") +
            "/",
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        )
        .then(res => {this.order = res.data,
        this.date = res.data.creation_date});
    }
  }
};
</script>