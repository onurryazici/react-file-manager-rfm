import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronCircleUp } from 'react-icons/fa';
import styles from '../styles.module.css'
import { useSelector, useStore } from 'react-redux';
import { HTTP_REQUEST } from '../helper/global';
import { size, toArray } from 'lodash';
import {  SET_UPLOAD_FILE } from '../context/functions';
export default function UploadButton(props) {
    const inputFileRef = useRef(null);
    const toastId      = useRef(null);
    const fileProgress = useSelector(state => state.fileProgress);
    const store = useStore();
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    
    function onFileChange(event){
        const files = event.target.files;
        store.dispatch(SET_UPLOAD_FILE(files));
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
