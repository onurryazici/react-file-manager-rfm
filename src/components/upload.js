import { Button } from 'react-bootstrap';
import React, { useRef } from 'react'
import { FaChevronCircleUp } from 'react-icons/fa';
import styles from '../styles.module.css'

export default function Upload(props) {
    const inputFileRef = useRef(null);
    const isContextMenuButton = props.isContextMenuButton==="yes" ? true : false;
    function onFileChange(e){
        console.log(e.target.files);
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
