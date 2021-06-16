import React from 'react'
import { useSelector } from 'react-redux';
import CreateFolderModal from '../modals/createFolderModal';
import UploadButton from './uploadButton';
function OnStartView() {
    const currentDirCanWritable = useSelector(state => state.currentDirCanWritable);
    return (
        <React.Fragment>
            <CreateFolderModal isContextMenuButton="no" active={currentDirCanWritable}/>
            <UploadButton isContextMenuButton="no" active={currentDirCanWritable}/>
        </React.Fragment>
    )
}
export default OnStartView;