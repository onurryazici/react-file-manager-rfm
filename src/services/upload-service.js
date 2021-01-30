import React from 'react'
import { toast } from "material-react-toastify";
import { useRef } from "react";
import { DispatchCaller, HTTP_REQUEST } from "../helper/global";
import { useDispatch } from 'react-redux';
import { Actions } from '../context/actions';

export function UploadService(files,dispatch){
    
    Array.from(files).forEach(async file => {
        const formPayload = new FormData();
        formPayload.append('file',file.file);
        const config  = { 
            onUploadProgress: (ProgresEvent) => {
                const {loaded, total} = ProgresEvent;
                let percentage = Math.floor(loaded / total) * 100;
                let payload = { id: file.id, progress : percentage };
                alert("c kısmı");
                //DispatchCaller(dispatch,Actions.SET_UPLOAD_PROGRESS, payload);
            }
        }
        try{    
            /*await HTTP_REQUEST.post('/uploadItem',formPayload,config).then((response)=>{
                
            });*/
            alert("b kısmı");

            DispatchCaller(dispatch,Actions.SUCCESS_UPLOAD_FILE,file.id);
        }
        catch(error){
            DispatchCaller(dispatch,Actions.FAILURE_UPLOAD_FILE,file.id);
            alert("hata var");
        }
    });

    
    
    /*return HTTP_REQUEST.post('/uploadItem',data,config)
    .then((response)=>{
        setTimeout(() => {
            toast.done(toastId.current);
            toastId.current = null;
        }, 1000);
        toast.update(toastId.current,{
            render: "✅ \"" + file.name + "\" yüklemesi tamamlandı",
            progress:0,
            autoClose:5000,
            type: toast.TYPE.INFO,
            className: 'rotateY animated'
        })
        const dispatch  = useDispatch();
       // DispatchCaller(dispatch, Actions.ADD_DIRECTORY_ITEM,response.data.item);
    }).catch((err)=>{
        console.log("hata " + err)
    });*/
}