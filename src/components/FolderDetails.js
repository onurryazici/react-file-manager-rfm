import React from 'react'
import styles from '../styles.module.css'
function FolderDetails(props){
        return(
            <div className={styles.folderDetails}>
                 {props.folderCount} klasör - {props.fileCount} Dosya
            </div>
        )
}

export default FolderDetails;