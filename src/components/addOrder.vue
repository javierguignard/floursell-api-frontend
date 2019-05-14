<template>
  <div id="AddOrder">
    <el-row type="flex" justify="center">
      <h1>Agregar Pedido</h1>
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
            <p>Cliente:</p>
          </el-col>
          <el-col :span="18">
            <el-select style="width:100%" v-model="selectedClient" placeholder="Select">
              <el-option
                v-for="client in clients"
                :key="client.id"
                :label="client.name"
                :value="client.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Pizza redonda:</p>
          </el-col>
          <el-col :span="18">
            <el-input-number v-model="items.pizzaRedonda" style="width:100%"></el-input-number>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Pizza redonda:</p>
          </el-col>
          <el-col :span="18">
            <el-input-number v-model="items.pizzaCuadrada" style="width:100%"></el-input-number>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Pizza redonda:</p>
          </el-col>
          <el-col :span="18">
            <el-input-number v-model="items.pizzeta" style="width:100%"></el-input-number>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Pizza redonda:</p>
          </el-col>
          <el-col :span="18">
            <el-input-number v-model="items.pancho" style="width:100%"></el-input-number>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p>Pizza redonda:</p>
          </el-col>
          <el-col :span="18">
            <el-input-number v-model="items.hamburguesa" style="width:100%"></el-input-number>
          </el-col>
        </el-row>
        <el-row>
          <el-button style="width:100%">Generar Venta</el-button>
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
  name: "AddOrder",
  data() {
    return {
      date: Date(),
      selectedClient: null,
      items: {
        pizzaRedonda: null,
        pizzaCuadrada: null,
        pizzeta: null,
        pancho: null,
        hamburguesa: null
      },
      clients: null
    };
  },
  methods: {
    submit() {
      axios
        .post(
          "http://127.0.0.1:8000/api/order/",
          {
            items: [],
            created_by: null,
            customer: this.selectedClient
          },
          {
            headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
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