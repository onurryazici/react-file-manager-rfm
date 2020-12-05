import React, { Component } from 'react'
import styles from '../styles.module.css'
import { FaFilePdf, FaFileWord, FaFileAlt,  FaFile, FaFileExcel} from 'react-icons/fa'
function File(props){
    const fileId = props.fileId;
    const fileName = props.fileName;
    const extension = props.extension;
    
    return(
        <div>
            {iconChooser(extension)}    
            <div className={styles.itemName}>{fileName}</div>
        </div>
    )
}

function iconChooser( extension)
{
    switch(extension)
    {
        case '.txt':
            return <FaFileAlt className={styles.itemIcon} color="#1c96a9" style={{width:'110px', height:"110px",marginLeft:"11px"}}/>
        case 'docx' || '.doc':
            return <FaFileWord color="#0066cc" className={styles.itemIcon} style={{width:'110px', height:"110px",marginLeft:"11px"}} />
        case '.pdf':
            return <FaFilePdf color="#d13131" className={styles.itemIcon} style={{width:'110px', height:"110px",marginLeft:"11px"}}/>
        case 'xlsx':
            return <FaFileExcel color="#1e7e34" className={styles.itemIcon} style={{width:'110px', height:"110px",marginLeft:"11px"}}/>
        default:
            return <FaFile color="#777777" className={styles.itemIcon} style={{width:'110px', height:"110px",marginLeft:"11px"}}/>;

    }
}

export default File;