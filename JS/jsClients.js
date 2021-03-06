ELEMENT.locale(ELEMENT.lang.es);

new Vue({
  el: '#app',
  data: {
    isCollapse: true,
    tableData: null,
    search: '',
    userType:null,
  },
  methods: {
    logOut() {
      localStorage.removeItem('key')
      localStorage.removeItem('userType')
      axios.post("http://localhost:8000/auth/logout/").then(function (response) {
        console.log(response.data.detail)
      })
        .catch(function (error) {
          console.log(error);
        });
      window.location.replace('/templates/login.html')
    },
    addClient() {
      window.location.replace('/templates/addClient.html')
    },
    ClientsPage() {
      window.location.replace('/templates/clients.html')
    },
    OrdersPage() {
      window.location.replace('/templates/orders.html')
    },
    ProductionOrdersPage() {
      window.location.replace('/templates/productionOrders.html')
    },
    pushClient(id) {
      localStorage.setItem('clientID', id)
      window.location.replace("/templates/clientSells.html")
    }
  },

  beforeCreate() {
    axios.get("http://127.0.0.1:8000/api/customer/",
      { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} ` } })
      .then(response => this.tableData = response.data)
    if (localStorage.getItem('key') == null) {
      window.location.replace('/templates/login.html')
    }
    axios.get("http://127.0.0.1:8000/api/user_type/",
    { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} ` } })
    .then(response => {
      this.userType= response.data[0].account.user_type
      localStorage.setItem("userType", response.data[0].account.user_type)
    }).then(response=>{
      if (localStorage.getItem("userType")== '1'){
        window.location.replace('/templates/productionOrders.html')
      }
    }
    )
  },
});