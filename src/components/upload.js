import { Button } from 'react-bootstrap';
import React, { useRef, useState } from 'react'
import { FaChevronCircleUp } from 'react-icons/fa';
import styles from '../styles.module.css'
import axios from 'axios';
import { toast } from 'material-react-toastify';
import { useDispatch } from 'react-redux';
import { DispatchCaller } from '../helper/global';
import { Actions } from '../context/actions';

export default function Upload(props) {
    const inputFileRef = useRef(null);
    const toastId      = useRef(null);
    const dispatch     = useDispatch();
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    function onFileChange(e){
        let data = new FormData();
        data.append('file',e.target.files[0]); // BURAYI DEĞİŞTİRMEK GEREKEBİLİR
        const config  = { 
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: (ProgresEvent) => {
                const {loaded, total} = ProgresEvent;
                let percent = Math.floor(loaded * 100 / total) / 100;
                if(toastId.current ===  null){
                    toastId.current = toast('Yükleniyor', {
                        progress: percent,
                    });
                    console.log(percent + "% AAAA");
                } 
                else {
                    toast.update(toastId.current, {
                        progress: percent
                    });
                    console.log(percent + "% BBBB");
                }
                
            }
        }
        axios.post('http://192.168.252.128:3030/api/uploadItem', data, config).then(res=>{
            setTimeout(() => {
                toast.done(toastId.current);
                toastId.current = null;
            }, 1000);
            toast.success("Yükleme tamamlandı")
        }).catch((err)=>{
            console.log("hata " + err)
        })
    }
    function handleClick(){
        inputFileRef.current.click();
    }
    return (
        <div>
            {
                isContextMenuButton ?
                <div>
                    <input ref={inputFileRef} style={{display:'none'}} type={"file"} onChange={onFileChange} />
                    <Button variant="light" className={styles.contextMenuItem} onClick={handleClick}>
                        <div style={{fontSize:'14px'}}>Yükle</div>
                    </Button>
                </div>
                :
                <div>
                <input ref={inputFileRef} style={{display:'none'}} type={"file"} onChange={onFileChange} />
                <Button variant="light" className={styles.actionbarButton} onClick={handleClick}>
                    <div className={styles.actionbarIcon}><FaChevronCircleUp color="#dc3545"/></div>
                    <div className={styles.actionbarText}>Yükle</div>
                </Button>
                </div>
            }
        </div>
    )
}
