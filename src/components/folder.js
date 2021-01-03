import React from 'react'
import { FaFolder } from 'react-icons/fa';

import styles from "../styles.module.css"
function Folder(props){
    const folderName = props.folderName;
    return(
        <div>
            <FaFolder className={styles.itemIcon} style={{color:"#f7b600"}}/>
            <div className={styles.itemName}>{folderName}</div>
        </div>
    )
}

export default Folder;