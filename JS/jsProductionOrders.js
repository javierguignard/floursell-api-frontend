ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: "#app",
    data: {
        date: "",
    },
    methods: {
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
        OrdersPage() {
            window.location.replace('/templates/orders.html')
        },
        ProductionOrdersPage() {
            window.location.replace('/templates/productionOrders.html')
        },
    },
    beforeCreate() {
        if (localStorage.getItem('key') == null) {
            window.location.replace('/templates/login.html')
        }
    },

})