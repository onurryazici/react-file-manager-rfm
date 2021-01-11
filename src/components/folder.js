import React from 'react'
import { FaFolder, FaFolderPlus, FaShare, FaUserCircle } from 'react-icons/fa';

import styles from "../styles.module.css"
function Folder(props){
    const folderType = props.folderType; // directory or symbolic
    const folderName = props.folderName;
    return(
        <div>
            { /// BURADAN DEVAM ET}
                folderType==="directory"?
                    <React.Fragment><FaFolder className={styles.itemIcon} style={{color:"#f7b600"}}/> 
                    <div className={styles.itemName}>{folderName}</div></React.Fragment>
                :
                    <React.Fragment>
                        <FaFolder className={styles.itemIcon} style={{color:"#f7b600"}}/>
                        <FaUserCircle className={styles.itemMiniIcon} style={{color:"#0066cc"}}/>
                        
                        <div className={styles.itemName}>{folderName}</div>
                        
                    </React.Fragment>
            }
        </div>
    )
}

export default Folder;