import React from 'react'
import { FaFolder, FaFolderPlus, FaUserCircle } from 'react-icons/fa';

import styles from "../styles.module.css"
function Folder(props){
    const folderType = props.folderType; // directory or symbolic
    const folderName = props.folderName;
    const viewMode   = props.viewMode;
    const selectedIconClass = viewMode === "grid" ? styles.itemIconGrid : styles.itemIconList;
    const selectedNameClass = viewMode === "grid" ? styles.itemNameGrid : styles.itemNameList;
    return(
        <React.Fragment>
            {
                folderType==="directory"?
                    <React.Fragment><FaFolder className={`${selectedIconClass}`} style={{color:"#f7b600"}}/> 
                    <div className={selectedNameClass}>{folderName}</div></React.Fragment>
                :
                    <React.Fragment>
                        <FaFolderPlus className={`${selectedIconClass}`} style={{color:"#f7b600"}}/>                        
                        <div className={`${selectedNameClass}`}>{folderName}</div>
                        
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Folder;