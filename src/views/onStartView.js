import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import { FaChevronCircleUp } from 'react-icons/fa';
import Upload from '../components/upload';
import CreateFolderModal from '../modals/createFolderModal';
import styles from '../styles.module.css'
function OnStartView() {
    
    return (
        <React.Fragment>
            <CreateFolderModal />
            <Upload/>
        </React.Fragment>
    )
}
export default OnStartView;