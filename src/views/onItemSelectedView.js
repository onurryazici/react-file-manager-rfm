import React from 'react'
import { Button } from 'react-bootstrap';
import { FaChevronCircleUp } from 'react-icons/fa';
import CreateFolderModal from '../modals/createFolderModal';
import styles from '../styles.module.css';
import ShareItemModal from '../modals/shareItemModal'
import RemoveItemModal from '../modals/removeItemModal'
import MoveItemModal from '../modals/moveItemModal'
import RenameItemModal from '../modals/renameItemModal'
import CopyItemModal from '../modals/copyItemModal';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../context/actions';
import ItemDetailModal from '../modals/itemDetailModal';
function OnItemSelectedView() {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const dispatch = useDispatch();
    function dispatchInvoker(typeValue,payloadValue)
    {
        return dispatch({type:typeValue, payload:payloadValue});
    }
    function clearSelection(){
        dispatchInvoker(Actions.CLEAR_SELECTED_ITEMS);
    }
    return (
        <div>
            <ShareItemModal isContextMenuButton="no"/>
            <RemoveItemModal isContextMenuButton="no"/>
            <MoveItemModal isContextMenuButton="no"/>
            <CopyItemModal/>
            {selectedItemCount === 1 ? <RenameItemModal isContextMenuButton="no"/> : ""}
            {selectedItemCount === 1 ? <ItemDetailModal isContextMenuButton="no"/> : ""}
            <Button variant="link" onClick={()=>clearSelection()}>Seçimi temizle</Button>
        </div>
    )
}
export default OnItemSelectedView;