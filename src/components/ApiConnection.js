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

axios.defaults.headers.common['Access-Control-Request-Headers'] = null
axios.defaults.headers.common['Access-Control-Request-Method'] = null

export const HTTP = axios.create({
    baseURL: API_ENDPOINT + 'api/',
})

export const HTTP_LOGIN = axios.create({
    baseURL: API_ENDPOINT,
})

export default {

}

