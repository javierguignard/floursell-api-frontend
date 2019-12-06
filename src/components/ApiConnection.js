import axios from "axios";

const dotenv = require('dotenv');
dotenv.config();

let endpoint = "";
if (process.env.API_ENDPOINT) {
    endpoint = process.env.API_ENDPOINT;
} else {
    endpoint = "http://floursell.kaajavi.com/"
}

const API_ENDPOINT = endpoint;

// axios.defaults.headers.common['Access-Control-Request-Headers'] = null
// axios.defaults.headers.common['Access-Control-Request-Method'] = null


function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export var CSRF_TOKEN = readCookie('csrftoken');

export const HTTP = axios.create({
    baseURL: API_ENDPOINT + 'api/',
})

export const HTTP_LOGIN = axios.create({
    baseURL: API_ENDPOINT,
})

export default {

}

