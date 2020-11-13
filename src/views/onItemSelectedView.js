import React from 'react'
import { Button } from 'react-bootstrap';
import { FaChevronCircleUp } from 'react-icons/fa';
import CreateFolderModal from '../modals/createFolderModal';
import styles from '../styles.module.css';
import ShareItemModal from '../modals/shareItemModal'
import RemoveItemModal from '../modals/removeItemModal'
import MoveItemModal from '../modals/moveItemModal'
import RenameItemModal from '../modals/renameItemModal'
import CopyItem from '../modals/copyItem';
function OnItemSelectedView() {
    return (
        <div>
            <ShareItemModal/>
            <RemoveItemModal/>
            <MoveItemModal />
            <CopyItem/>
            <RenameItemModal/>
        </div>
    )
}
export default OnItemSelectedView;