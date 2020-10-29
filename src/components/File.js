import React, { Component } from 'react'
import {ReactComponent as PdfSVG}from '../assets/svg/extensions/pdf.svg'
import {ReactComponent as TxtSVG} from '../assets/svg/extensions/txt.svg'
import {ReactComponent as UnknownExtensionSVG} from '../assets/svg/extensions/unknown-extension.svg'
import {ReactComponent as DocxSVG} from '../assets/svg/extensions/docx.svg'
function File(props){
    const fileId = props.fileId;
    const fileName = props.fileName;
    const extension = fileName.substr(fileName.length - 4);
    
    return(
        <div>
            {iconChooser(extension)}    
            <span className="item-name">{fileName}</span>
        </div>
    )
}

function iconChooser( extension)
{
    switch(extension)
    {
        case '.pdf':
            return <PdfSVG className="item-icon" style={{width:'70%'}}/>
        case '.txt':
            return <TxtSVG className="item-icon"/>
        default:
            return <UnknownExtensionSVG  className="item-icon" style={{width:'70%'}}/>;
    }
}

export default File;