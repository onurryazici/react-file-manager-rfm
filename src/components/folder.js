import React, { Component } from 'react'
import {ReactComponent as FolderSVG} from '../../example/public/assets/svg/actionbar-icons/folder.svg'
import styles from "../styles.module.css"
function Folder(props){
    const folderName = props.folderName;
    return(
        <div>
            <FolderSVG className={styles.itemIcon}/>
            <div className={styles.itemName}>{folderName}</div>
        </div>
    )
}

export default Folder;