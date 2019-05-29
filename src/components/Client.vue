<template>
  <div id="client">
    <el-row type="flex" justify="center">
      <h1>Clientes</h1>
    </el-row>

    <el-row type="flex" justify="center">
      <el-input v-model="search" placeholder="Buscar cliente por nombre">
        <el-button slot="append" icon="el-icon-search" @click="filter()"></el-button>
      </el-input>
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
import Magnify from "vue-material-design-icons/Magnify.vue";
import eye from "vue-material-design-icons/Eye.vue";
export default {
  name: "Client",
  components: {
    eye,
    cart,
    Magnify
  },
  data() {
    return {
      search: null,
      tableData: null,
      clients: null
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
    filter() {
      
      var x;
      if (this.search == null) {
        this.$message({
          showClose: true,
          message: "texto vacio",
          type: "warning"
        });
      } else {
        this.tableData = [];
        for (x in this.clients) {
          if (
            this.clients[x].name
              .toLowerCase()
              .includes(this.search.toLowerCase())
          )
            this.tableData.push(this.clients[x]);
        }
      }
    }
  },
  beforeCreate() {
    localStorage.removeItem("clientID");
    localStorage.removeItem("sellID");
    localStorage.removeItem("paymentID");
    localStorage.removeItem("orderID");
    localStorage.removeItem("date");
    axios
      .get("http://127.0.0.1:8000/api/customer/", {
        headers: { Authorization: `Token ${localStorage.getItem("key")} ` }
      })
      .then(response => {
        this.clients = response.data;
        this.tableData = this.clients;
      })
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
