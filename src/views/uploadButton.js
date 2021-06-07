import { Button } from 'react-bootstrap';
import React, { useRef } from 'react'
import { FaChevronCircleUp } from 'react-icons/fa';
import styles from '../styles.module.css'
import { UploadService } from '../helper/events';
import { useMediaQuery } from 'react-responsive';
export default function UploadButton(props) {
    const inputFileRef = useRef(null);
    const active       = props.active;
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    const isDesktopOrLaptop    = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isBigScreen 		   = useMediaQuery({ query: '(min-device-width: 1824px)' })
    function onFileChange(event){
        const files = event.target.files;
        UploadService(files)
    }
    function handleClick(){
        inputFileRef.current.click();
    }
    return (
        <div>
            {
                (isContextMenuButton)?
                <div>
                    <input ref={inputFileRef} style={{display:'none'}} type={"file"} onChange={onFileChange} multiple/>
                    <Button variant="light" className={styles.contextMenuItem} onClick={handleClick} disabled={!active}>
                        <div style={{fontSize:'14px'}}>Yükle</div>
                    </Button>
                </div>
                :
                <div>
                <input ref={inputFileRef} style={{display:'none'}} type={"file"} onChange={onFileChange} multiple/>
                <Button variant="light" className={styles.actionbarButton} onClick={handleClick} disabled={!active}>
                    <div className={styles.actionbarIcon}><FaChevronCircleUp color="#dc3545"/></div>
                    {isDesktopOrLaptop || isBigScreen 
					? <div className={styles.actionbarText}>Yükle</div>
					: ""
				}
                </Button>
                </div>
            }
        </div>
    )
}
