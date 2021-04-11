import React from 'react'
import { useSelector } from 'react-redux';
import CreateFolderModal from '../modals/createFolderModal';
import UploadButton from './uploadButton';
function OnStartView() {
    const currentDirCanWrite = useSelector(state => state.currentDirCanWrite);
    return (
        <React.Fragment>
            <CreateFolderModal isContextMenuButton="no" active={currentDirCanWrite}/>
            <UploadButton isContextMenuButton="no" active={currentDirCanWrite}/>
        </React.Fragment>
    )
}
export default OnStartView;