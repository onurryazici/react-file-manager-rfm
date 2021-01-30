import axios from "axios";

export function DispatchCaller(dispatchObject,typeValue,payloadValue)
{
    let dispatch = dispatchObject;
    return dispatch({type:typeValue, payload:payloadValue});
}  
export const HTTP_REQUEST = axios.create({
    baseURL:"http://192.168.252.128:3030/api"
})