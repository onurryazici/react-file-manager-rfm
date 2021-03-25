import axios from "axios";
import {store} from '../context/store'
/*const API_URL = store.getState().config.API_URL;

export const HTTP_REQUEST = API_URL !== undefined ? axios.create({
        baseURL:API_URL
    }) : ()=>{};
*/

export const RFM_WindowType = {
    RECYCLE_BIN:"RECYCLE_BIN",
    DRIVE:"DRIVE",
    SHARED_WITH_ME:"SHARED_WITH_ME",
    MY_SHARED:"MY_SHARED"
}