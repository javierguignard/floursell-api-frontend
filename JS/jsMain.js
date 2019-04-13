new Vue({
  el: '#app',
  data: {
    isCollapse: true,
    input5: '',
    tableData2: null,
  },
  methods: {
    menu() {
      this.isCollapse = !this.isCollapse;
    },
    logOut() {
      localStorage.removeItem('key')
      axios.post("http://localhost:8000/%5Eauth/logout/").then(function (response) {
        console.log(response.data.detail)
      })
        .catch(function (error) {
          console.log(error);
        });
      window.location.replace('/templates/login.html')
    },
  },

  beforeCreate() {
      axios.get("http://127.0.0.1:8000/api/customer/",
      { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} `}})
      .then(response => this.tableData2= response.data)
  },
})