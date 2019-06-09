<template>
  <div id="productionTemplate">
    <el-row type="flex" justify="center">
      <h1>Planilla Producidos</h1>
    </el-row>
    <el-row>
      <el-card>
        <el-row type="flex" justify="center">Fecha: {{date}}</el-row>
        <br>
        <el-row type="flex" justify="center" v-for="(item,index) in products" :key="index">
          <el-col>
            <p>{{item.title}}</p>
          </el-col>
          <el-col>
            <el-input-number v-model="products[index].quantity"></el-input-number>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-top:75px;">
      <el-card>
        <el-row>
          <el-button type="primary" @click="submit()" style="width:100%;">Guardar</el-button>
        </el-row>
        <br>
        <el-row>
          <el-button type="danger" @click="move('productionOrders')" style="width:100%;">volver</el-button>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import {HTTP} from "./ApiConnection";
export default {
  name: "productionTemplate",
  data() {
    return {
      date: localStorage.getItem("date"),
      reports: null,
      products: null,
      reportID: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
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
      if (this.reportID) {
        HTTP.put(
          "report/" + this.reportID + "/",
          {
            items: this.postItems()
          },
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        ).then(
            this.$message({
              showClose: true,
              message: "planilla modificada con exito",
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
      }else{
        HTTP.post("report/",
          {
            items: this.postItems(),
            creation_date: this.date,
          },
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
          }
        ).then(
            this.$message({
              showClose: true,
              message: "planilla creada con exito",
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
  created() {
    var bproducts = [];
    var x;
    var y;

    HTTP
      .get("product/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(res => {
        var x;
        for (x in res.data) {
          bproducts.push({
            id: res.data[x].id,
            title: res.data[x].title,
            quantity: 0
          });
        }
      });

    HTTP
      .get("report/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => {
        for (x in response.data) {
          if (response.data[x].creation_date.substring(0, 10) == this.date) {
            this.reportID = response.data[x].id;
            for (y in response.data[x].items) {
              if (response.data[x].items[y].product == bproducts[y].id) {
                bproducts[y].quantity += response.data[x].items[y].quantity;
              }
            }
          }
        }
      });
    this.products = bproducts;
  }
};
</script>
