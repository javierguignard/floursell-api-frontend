ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: '#app',
    data: {
        value1: '',
        item1:0,
        item2:'',
        item3:'',
        item4:'',
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
                { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} ` } })
                .then(response => {
                    this.$message.success("Cliente creado con exito :D");
                }).catch(error => {
                    console.log(error)
                    this.$message.error(error.toString());
                })
        },
        goBack() {
            window.location.replace('/templates/orders.html')
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
        ClientsPage() {
            window.location.replace('/templates/clients.html')
        },
        OrdersPage(){
            window.location.replace('/templates/orders.html')
          }
    },
    beforeCreate() {
        if(localStorage.getItem('key') == null){
            window.location.replace('/templates/login.html')}
    },
}
)