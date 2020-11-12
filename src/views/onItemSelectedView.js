import React from 'react'
import { Button } from 'react-bootstrap';
import { FaChevronCircleUp } from 'react-icons/fa';
import CreateFolderModal from '../modals/createFolderModal';
import styles from '../styles.module.css';
function OnItemSelectedView() {
    return (
        <div>
            <CreateFolderModal />
            <Button variant="light" className={styles.actionbarButton}>
                <div className={styles.actionbarIcon}><FaChevronCircleUp color="#dc3545"/></div>
                <div className={styles.actionbarText}>Yükle</div>
            </Button>
        </div>
    )
}
export default OnItemSelectedView;