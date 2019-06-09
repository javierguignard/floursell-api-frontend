import axios from "axios";

const dotenv = require('dotenv');
dotenv.config();

let endpoint = "";
if (process.env.API_ENDPOINT) {
    endpoint = process.env.API_ENDPOINT;
} else {
    endpoint = "http://127.0.0.1:8000/"
}

const API_ENDPOINT = endpoint;


export const HTTP = axios.create({
    baseURL: API_ENDPOINT + 'api/',
})

export const HTTP_LOGIN = axios.create({
    baseURL: API_ENDPOINT,
})

export default {

}

