<template>
  <div id="productionOrders">
    <el-row type="flex" justify="center">
      <h1>ABM Pedidos</h1>
    </el-row>
    <br>
    <el-row>
      <el-card>
        <el-row>
          Fecha
          <el-date-picker style="width:100%" type="date" placeholder="Pick a day"></el-date-picker>
        </el-row>
        <br>
        <el-row type="flex" justify="space-between">
          <p>Pan pizza redondo</p>
          <p>2</p>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pan pizza cuadrado</p>
          <p>0</p>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pizzeta</p>
          <p>2</p>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pan Pancho</p>
          <p>0</p>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pan hamburguesa</p>
          <p>0</p>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-top:75px;">
      <el-card>
        <el-button @click="move('productionTemplate')" style="width:100%;">Generar plantilla de produccion</el-button>
      </el-card>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "productionOrders",
  data() {
    return {};
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
  }
};
</script>
