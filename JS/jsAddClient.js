new Vue({
    el: '#app',
    data: {
        newClient: {
            name: "",
            address: "",
            phone: "",
            email: "",
            observations: ""
        }
    },

    methods: {
        pushCustomer() {
            axios.post("http://localhost:8000/api/customer/",
                {
                    "name": this.newClient.name,
                    "address": this.newClient.address,
                    "phone": this.newClient.phone,
                    "email": this.newClient.email,
                    "observations": this.newClient.observations,
                    "created_by": 1
                },
                { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} `}})
                .then(response => {
                    this.$message.success("Cliente creado con exito :D");
                }).catch(error => {
                    console.log(error)
                    this.$message.error(error.toString());
                })
        },
        goBack() {
            window.location.replace('/templates/main.html')
        },
    },
}
)