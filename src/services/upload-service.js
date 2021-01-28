import React from 'react'
import { toast } from "material-react-toastify";
import { useRef } from "react";
import { HTTP_REQUEST } from "../helper/global";
import { useDispatch } from 'react-redux';
import { Actions } from '../context/actions';

export function UploadService(file){
    const toastId      = React.createRef(null);


    let data = new FormData();
    data.append('file',file);

    const config  = { 
        headers: {
            'content-type': 'multipart/form-data'
        },
        onUploadProgress: (ProgresEvent) => {
            const {loaded, total} = ProgresEvent;
            let percent = Math.floor(loaded * 100 / total) / 100;
            if(toastId.current ===  null){
                toastId.current = toast("🔺 " + file.name, {
                    progress: percent,
                });
            } 
            else {
                toast.update(toastId.current, {
                    progress: percent
                });
            }
        }
    }
    return HTTP_REQUEST.post('/uploadItem',data,config)
    .then((response)=>{
        setTimeout(() => {
            toast.done(toastId.current);
            toastId.current = null;
        }, 1000);
        toast.success(file.name + " yüklendi");
        const dispatch  = useDispatch();
       // DispatchCaller(dispatch, Actions.ADD_DIRECTORY_ITEM,response.data.item);
    }).catch((err)=>{
        console.log("hata " + err)
    });
}