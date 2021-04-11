import classNames from 'classnames';
import React from 'react'
import { FaFolder, FaFolderPlus, FaUserCircle } from 'react-icons/fa';

import styles from "../styles.module.css"
function Folder(props){
    const folderType = props.folderType; // directory or symbolic
    const folderName = props.folderName;
    const canWrite   = props.canWrite;
    const viewMode   = props.viewMode;
    const selectedIconClass = viewMode === "grid" ? styles.itemIconGrid : styles.itemIconList;
    const selectedNameClass = viewMode === "grid" ? styles.itemNameGrid : styles.itemNameList;
    const disableStyle = (canWrite === false) ? {pointerEvents:'none', opacity:'0.4'} : {}
    return(
        <React.Fragment>
            {
                folderType==="directory"?
                    <React.Fragment><FaFolder className={classNames(selectedIconClass,disableStyle)} style={{color:"#f7b600"}}/> 
                    <div className={selectedNameClass}>{folderName}</div></React.Fragment>
                :
                    <React.Fragment>
                        <FaFolderPlus className={classNames(selectedIconClass,disableStyle)} style={{color:"#f7b600"}}/>                        
                        <div className={`${selectedNameClass}`}>{folderName}</div>
                        
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Folder;