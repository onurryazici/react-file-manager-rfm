import React from 'react'
import CreateFolderModal from '../modals/createFolderModal';
import UploadButton from './uploadButton';
function OnStartView() {
    
    return (
        <React.Fragment>
            <CreateFolderModal />
            <UploadButton/>
        </React.Fragment>
    )
}
export default OnStartView;