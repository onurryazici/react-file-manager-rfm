import axios from "axios";
import {store} from '../context/store'
const API_URL = store.getState().config.API_URL;

export const HTTP_REQUEST = API_URL !== undefined ? axios.create({
        baseURL:API_URL
    }) : ()=>{};

