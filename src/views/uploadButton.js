import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronCircleUp } from 'react-icons/fa';
import styles from '../styles.module.css'
import axios from 'axios';
import { toast } from 'material-react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchCaller, HTTP_REQUEST } from '../helper/global';
import { Actions } from '../context/actions';
import { size, toArray } from 'lodash';

export default function UploadButton(props) {
    const inputFileRef = useRef(null);
    const toastId      = useRef(null);
    const fileProgress = useSelector(state => state.fileProgress);
    
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(uploadedFileAmount + " miktar");
        /*
        if(uploadedFileAmount > 0) {
            const fileToUpload = toArray(fileProgress).filter(file => file.progress===0 && !file.completed);
            UploadService(fileToUpload);
        }*/
        
      }, [uploadedFileAmount])

    function UploadService(files) {
        Array.from(files).forEach(async (_file,_id) => {
            var formPayload = new FormData();
            formPayload.append('file', _file.file);   
            const config  = { 
                headers:{
                    'content-type':'multipart/form-data'
                },
                onUploadProgress: (ProgresEvent) => {
                    const {loaded, total} = ProgresEvent;
                    const percentage = Math.floor((loaded / total) * 100 );
                    const payload = { id: _file.id, progress : percentage };
                    DispatchCaller(dispatch,Actions.SET_UPLOAD_PROGRESS, payload);
                }
            }
            try{
                await HTTP_REQUEST.post('/uploadItem',formPayload,config);
                DispatchCaller(dispatch,Actions.SUCCESS_UPLOAD_FILE, _file.id);
            }catch(error){
                DispatchCaller(dispatch,Actions.FAILURE_UPLOAD_FILE, _file.id);
            }
            
            
        });
    }


    function onFileChange(event){
        const files = event.target.files;
        DispatchCaller(dispatch, Actions.SET_UPLOAD_FILE,files);
        //UploadService(fileToUpload);
    }
    function handleClick(){
        inputFileRef.current.click();
    }
    return (
        <div>
            {
                isContextMenuButton ?
                <div>
                    <input ref={inputFileRef} style={{display:'none'}} type={"file"} onChange={onFileChange} multiple/>
                    <Button variant="light" className={styles.contextMenuItem} onClick={handleClick}>
                        <div style={{fontSize:'14px'}}>Yükle</div>
                    </Button>
                </div>
                :
                <div>
                <input ref={inputFileRef} style={{display:'none'}} type={"file"} onChange={onFileChange} multiple/>
                <Button variant="light" className={styles.actionbarButton} onClick={handleClick}>
                    <div className={styles.actionbarIcon}><FaChevronCircleUp color="#dc3545"/></div>
                    <div className={styles.actionbarText}>Yükle</div>
                </Button>
                </div>
            }
        </div>
    )
}
