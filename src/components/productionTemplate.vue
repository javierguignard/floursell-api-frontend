<template>
  <div id="productionTemplate">
    <el-row type="flex" justify="center">
      <h1>Planilla Producidos</h1>
    </el-row>
    <el-row>
      <el-card>
        <el-row
          type="flex"
          justify="center"
        >Fecha: {{date.getDate()}} / {{date.getMonth()+1}} / {{date.getFullYear()}}</el-row>
        <br>
        <el-row type="flex" justify="space-between">
          <p>Pan pizza redondo</p>
          <el-input-number style="width:45%; align-self: center;"></el-input-number>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pan pizza cuadrado</p>
          <el-input-number style="width:45%; align-self: center;"></el-input-number>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pizzeta</p>
          <el-input-number style="width:45%; align-self: center;"></el-input-number>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pan Pancho</p>
          <el-input-number style="width:45%; align-self: center;"></el-input-number>
        </el-row>
        <el-row type="flex" justify="space-between">
          <p>Pan hamburguesa</p>
          <el-input-number style="width:45%; align-self: center;"></el-input-number>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-top:75px;">
      <el-card>
        <el-button type="primary" style="width:100%;">Guardar</el-button>
      </el-card>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "productionTemplate",
  data() {
    return {
      date: new Date()
    };
  },
  methods: {}
};
</script>
