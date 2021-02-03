import React from 'react'
import { useSelector, useStore } from 'react-redux';
import { FAILURE_UPLOAD_FILE, SET_UPLOAD_PROGRESS, SUCCESS_UPLOAD_FILE } from '../context/functions';
import {  HTTP_REQUEST } from "../helper/global";

const fileProgress = useSelector(state => state.fileProgress);
const store = useStore();
export function UploadService(files) {
    Array.from(files).forEach(async (_file,_id) => {
        try{
            var formPayload = new FormData();
            formPayload.append('file', _file.file);   
            const config  = { 
                headers:{
                    'content-type':'multipart/form-data'
                },
                onUploadProgress: (ProgresEvent) => {
                    const {loaded, total} = ProgresEvent;
                    const percentage = Math.floor((loaded / total) * 100 );
                    store.dispatch(SET_UPLOAD_PROGRESS(_file.id, percentage));
                }
            }
            await HTTP_REQUEST.post('/uploadItem',formPayload, config);
            setTimeout(() => {
                store.dispatch(SUCCESS_UPLOAD_FILE(_file.id));    
            }, 1000);
            
        }catch(error){
            alert("hata " + error)
            store.dispatch(FAILURE_UPLOAD_FILE(_file.id))
        }
    });
}
