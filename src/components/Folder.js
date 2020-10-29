import React, { Component } from 'react'
import {ReactComponent as FolderSVG} from '../assets/svg/actionbar-icons/folder.svg'

function Folder(props){
    const folderName = props.folderName;
    return(
        <div>
            <FolderSVG className="item-icon"/>
            <span className="item-name">{folderName}</span>
        </div>
    )
}

export default Folder;