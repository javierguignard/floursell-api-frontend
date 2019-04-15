ELEMENT.locale(ELEMENT.lang.es);

new Vue({
  el: '#app',
  data: {
    isCollapse: true,
    tableData: null,
    search: ''
  },
  methods: {
    menu() {
      this.isCollapse = !this.isCollapse;
    },
    logOut() {
      localStorage.removeItem('key')
      axios.post("http://localhost:8000/auth/logout/").then(function (response) {
        console.log(response.data.detail)
      })
        .catch(function (error) {
          console.log(error);
        });
      window.location.replace('/templates/login.html')
    },
    addClient(){
      window.location.replace('/templates/addClient.html')
    },
    ClientsPage(){
      window.location.replace('/templates/clients.html')
    },
    OrdersPage(){
      window.location.replace('/templates/orders.html')
    }
  },

  beforeCreate() {
      axios.get("http://127.0.0.1:8000/api/customer/",
      { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} `}})
      .then(response => this.tableData= response.data)
  },
});