ELEMENT.locale(ELEMENT.lang.es);

new Vue({
  el: '#app',
  data: {
    login: {
      name: '',
      password: '',
    }
  },
  methods: {
    register() {
      window.location.replace("/templates/registration.html")
    },
    onSubmit() {
      axios.post("http://localhost:8000/auth/login/",
        {
          "username": this.login.name,
          "password": this.login.password,
        })
        .then(response => {
          key = response.data.key;
          if (key) {
            localStorage.setItem("key", key)
            window.location.replace('clients.html')
          }
        }).catch(error => {
          console.log(error)
          this.$message.error("Error en el inicio de sesion.");
        })

    }
  },
  beforeCreate() {
    if (localStorage.getItem('key')) {
      localStorage.removeItem('userType')
    }
  },
})