ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: '#app',
    data: {
        register: {
            name: '',
            email: '',
            password1: '',
            password2: '',
        }
    },
    methods: {
        goBack(){
            window.location.replace("/templates/login.html")
        },
        onSubmit() {
            axios.post("http://localhost:8000/registration/",
                {
                    "username": this.register.name,
                    "email": this.register.email,
                    "password1": this.register.password1,
                    "password2": this.register.password2
                })
                .then(response => {
                    console.log(response.data)
                    window.location.replace("/templates/login.html")
                }).catch(error => {
                    console.log(error)
                    this.$message.error("Error al registrarse :C.");
                })
        }
    },
    beforeCreate() {
        if (localStorage.getItem('key')) {
            localStorage.removeItem('key')
        }
    },

})