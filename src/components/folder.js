import React from 'react'
import { FaFolder, FaFolderPlus, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RFM_WindowType } from '../helper/global';

import styles from "../styles.module.css"
function Folder(props){
    const folderType = props.folderType; // directory or symbolic
    const folderName = props.folderName;
    const canWrite   = props.canWrite;
    const viewMode   = props.viewMode;
    const selectedIconClass = viewMode === "grid" ? styles.itemIconGrid : styles.itemIconList;
    const selectedNameClass = viewMode === "grid" ? styles.itemNameGrid : styles.itemNameList;
    const disableStyle = (canWrite === false) ? {pointerEvents:'none', opacity:'0.4'} : {}
    const rfmWindow = useSelector(state => state.rfmWindow)
    return(
        <React.Fragment>
            {
                rfmWindow===RFM_WindowType.MY_SHARED || rfmWindow === RFM_WindowType.SHARED_WITH_ME
                ?
                    <React.Fragment>
                        <FaFolder className={selectedIconClass} style={{color:"#f7b600"}}/>       
                        <FaUserCircle className={styles.shareUserLogo}/>
                        <div className={`${selectedNameClass}`}>{folderName}</div>
                    </React.Fragment>
                :
                    <React.Fragment><FaFolder className={selectedIconClass} style={{color:"#f7b600"}}/> 
                    <div className={selectedNameClass}>{folderName}</div></React.Fragment>
            }
        </React.Fragment>
    )
}

export default Folder;