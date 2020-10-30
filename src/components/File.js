import React, { Component } from 'react'
import {ReactComponent as PdfSVG}from '../assets/svg/extensions/pdf.svg'
import {ReactComponent as TxtSVG} from '../assets/svg/extensions/txt.svg'
import {ReactComponent as UnknownExtensionSVG} from '../assets/svg/extensions/unknown-extension.svg'
import {ReactComponent as DocxSVG} from '../assets/svg/extensions/docx.svg'
import styles from '../styles.module.css'
function File(props){
    const fileId = props.fileId;
    const fileName = props.fileName;
    const extension = fileName.substr(fileName.length - 4);
    
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
        case '.pdf':
            return <PdfSVG className={styles.itemIcon} style={{width:'70%'}}/>
        case '.txt':
            return <TxtSVG className={styles.itemIcon}/>
        default:
            return <UnknownExtensionSVG  className={styles.itemIcon} style={{width:'110px', height:"110px",textAlign:"center"}}/>;
    }
}

export default File;