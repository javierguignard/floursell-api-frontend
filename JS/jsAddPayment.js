ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: "#app",
    data: {
        userType: localStorage.getItem("userType"),
        clientID: localStorage.getItem('clientID'),
        clientData: null,
        amount: 0,
        date: new Date(),
    },
    methods: {
        ClientsPage() {
            window.location.replace('/templates/clients.html')
        },
        OrdersPage() {
            window.location.replace('/templates/orders.html')
        },
        logOut() {
            localStorage.removeItem('key')
            localStorage.removeItem('userType')
            axios.post("http://localhost:8000/auth/logout/").then(function (response) {
                console.log(response.data.detail)
                window.location.replace("/templates/login.html")
            })
        },
        save() {
            axios.post("http://127.0.0.1:8000/api/payment/", {
                "amount": this.amount,
                "created_by": localStorage.getItem("userID"),
                "customer": this.clientID
            }, { 'headers': { 'Authorization': `Token  ` } },
                
            ).catch(error => {
                    console.log(localStorage.getItem('key'))
                })
        },
        ProductionOrdersPage() {
            window.location.replace('/templates/productionOrders.html')
        },
    },
    beforeCreate() {
        if (localStorage.getItem('key') == null) {
            window.location.replace('/templates/login.html')
        }
        axios.get("http://127.0.0.1:8000/api/customer/",
            { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} ` } })
            .then(response => this.clientData = response.data)
            .catch(error => {
                console.log(error)
            })
    },
})