import React from 'react'
function FolderDetails(props){
        return(
            <div className="folder-details">
                 {props.folderCount} klasör - {props.fileCount} Dosya
            </div>
        )
}

export default FolderDetails;