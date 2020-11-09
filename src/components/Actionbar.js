import React from 'react'
import { Button } from 'react-bootstrap';
import styles from '../styles.module.css'
import CreateFolderModal from '../modals/createFolderModal';
import 'bootstrap/dist/css/bootstrap.css';
import { FaChevronCircleUp } from 'react-icons/fa';
function Actionbar() {
    return (
        
        <div id={styles.actionbarStage}>
            <CreateFolderModal />
            <Button variant="light" className={styles.actionbarButton}>
                <div className={styles.actionbarIcon}><FaChevronCircleUp color="#dc3545"/></div>
                <div className={styles.actionbarText}>Yükle</div>
            </Button>
        </div>
    )
}
export default Actionbar;