ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: "#app",
    data: {
        clientID: localStorage.getItem('clientID'),
        clientData: null,
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
            axios.post("http://localhost:8000/auth/logout/").then(function (response) {
                console.log(response.data.detail)
            })
        },
        newPayment() {
            window.location.replace('/templates/addPayment.html')
        },
    },
    beforeCreate() {
        if (localStorage.getItem('key') == null) {
            window.location.replace('/templates/login.html')
        }
        axios.get("http://127.0.0.1:8000/api/customer/",
            { 'headers': { 'Authorization': `Token ${localStorage.getItem('key')} ` } })
            .then(response => this.clientData = response.data)
    },
})