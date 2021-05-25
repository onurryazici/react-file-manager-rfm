import axios from "axios";
import {RFM_Store} from '../redux/rfmStore'
/*const API_URL = RFM_Store.getState().config.API_URL;

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
export const FileProgressType = {
    DOWNLOAD:"DOWNLOAD",
    UPLOAD:"UPLOAD"
}