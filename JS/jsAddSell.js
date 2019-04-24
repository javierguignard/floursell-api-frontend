ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el:"#app",
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
        logOut() {
            localStorage.removeItem('key')
            axios.post("http://localhost:8000/auth/logout/").then(function (response) {
                console.log(response.data.detail)
                window.location.replace("/templates/login.html")
            })
                .catch(function (error) {
                    console.log(error);
                });
            window.location.replace('/templates/login.html')
        },
        ClientsPage() {
            window.location.replace('/templates/clients.html')
        },
        OrdersPage() {
            window.location.replace('/templates/orders.html')
        },
        newPayment() {
            window.location.replace('/templates/addPayment.html')
        },
    },
    beforeCreate() {

    },
})