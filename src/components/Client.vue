<template>
  <div id="client">
    <el-row type="flex" justify="center">
      <h1>Client</h1>
    </el-row>

    <el-row type="flex" justify="center">
      <el-input key v-model="search" placeholder="Buscar cliente por nombre"></el-input>
      <el-button @click="getTableData()">Get Data (Beta)</el-button>
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
          <template slot-scope>
            <el-row>
              <el-col :span="8">
                <el-button>
                  <cart/>
                </el-button>
              </el-col>
              <el-col :span="8">
                <el-button>
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-col>
              <el-col :span="8">
                <el-button>
                  <eye/>
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import cart from "vue-material-design-icons/CartOutline.vue";
import eye from "vue-material-design-icons/Eye.vue";
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
    hola() {
      console.log("hola");
      this.tableData.filter(
        !this.search ||
          this.tableData.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    getTableData() {
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
  },
};
</script>
