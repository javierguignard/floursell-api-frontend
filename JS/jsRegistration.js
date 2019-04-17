ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: '#app',
    data: {
        register: {
            name: 'kaneki',
            email: 'kaneki@gmail.com',
            password1: 'pepe124',
            password2: 'pepe1234',
        }
    },
    methods: {
        goBack(){
            window.location.replace("/templates/login.html")
        },
        onSubmit() {
            axios.post("http://127.0.0.1:8000/registration/",
            { 'headers': { 'Authorization': `Token 	db086ad201d75a6d100d9b9e04b444384200304e ` } },
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