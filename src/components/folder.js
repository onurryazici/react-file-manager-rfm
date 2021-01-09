import React from 'react'
import { FaFolder } from 'react-icons/fa';

import styles from "../styles.module.css"
function Folder(props){
    const folderType = props.folderType; // directory or symbolic
    const folderName = props.folderName;
    return(
        <div>
            { /// BURADAN DEVAM ET}
            <FaFolder className={styles.itemIcon} style={{color:"#f7b600"}}/>
            <div className={styles.itemName}>{folderName}</div>
        </div>
    )
}

export default Folder;