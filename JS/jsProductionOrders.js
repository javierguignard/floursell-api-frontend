ELEMENT.locale(ELEMENT.lang.es);

new Vue({
    el: "#app",
    data: {

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
    },
    beforeCreate() {
        if (localStorage.getItem('key') == null) {
            window.location.replace('/templates/login.html')
        }
    },

})