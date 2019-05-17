<template>
  <div id="client">
    <el-row type="flex" justify="center">
      <h1>Clientes</h1>
    </el-row>

    <el-row type="flex" justify="center">
      <el-input key v-model="search" placeholder="Buscar cliente por nombre"></el-input>
      <el-button>Search </el-button>
    </el-row>

    <br>
    <el-row>
      <el-table width="50%" :data="tableData">
        <el-table-column label="Nombre">
          <template slot-scope="props">
            {{props.row.name}}
            <br>
            Telefono: {{ props.row.phone }}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            <el-row>
              <el-col :span="8">
                <el-button @click="moveWithID(props.row.id, 'AddOrder')">
                  <cart/>
                </el-button>
              </el-col>
              <el-col :span="8">
                <el-button @click="moveWithID(props.row.id, 'AddClient')">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-col>
              <el-col :span="8">
                <el-button @click="moveWithID(props.row.id, 'ClientSells')">
                  <eye/>
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-row type="flex" justify="end">
        <el-button
          @click="move('AddClient')"
          style="margin-right:10px;"
          type="primary"
        >Agregar Nuevo Cliente</el-button>
      </el-row>
      <br>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import cart from "vue-material-design-icons/CartPlus.vue";
import eye from "vue-material-design-icons/Eye.vue";

function getClients(){

};

export default {
  name: "Client",
  components: {
    eye,
    cart
  },
  data() {
    return {
      search: null,
      tableData: null
    };
  },
  methods: {
    move(route) {
      this.$router.push({ name: route });
    },
    /*hola() {
      console.log("hola");
      this.tableData.filter(
        !this.search ||
          this.tableData.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },*/
    moveWithID(id, route) {
      localStorage.setItem("clientID", id);
      this.move(route);
    },
  },
  beforeCreate() {
    localStorage.removeItem("clientID")
    axios
      .get("http://127.0.0.1:8000/api/customer/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => (this.tableData = response.data))
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
