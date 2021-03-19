import React from 'react'
import { Button } from 'react-bootstrap';
import NewShareItemModal from '../modals/newShareItemModal'
import RemoveItemModal from '../modals/removeItemModal'
import MoveItemModal from '../modals/moveItemModal'
import RenameItemModal from '../modals/renameItemModal'
import CopyItemModal from '../modals/createCopyItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import { CLEAR_SELECTED_ITEMS } from '../context/functions';
import { useSelector, useStore } from 'react-redux';

function OnItemSelectedView() {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const store = useStore();
    function clearSelection(){
        store.dispatch(CLEAR_SELECTED_ITEMS(null));
    }
    return (
        <div>
            {selectedItemCount === 1 ? <NewShareItemModal isContextMenuButton="no"/> : ""}
            <RemoveItemModal isContextMenuButton="no"/>
            <MoveItemModal isContextMenuButton="no"/>
            <CopyItemModal isContextMenuButton="no"/>
            {selectedItemCount === 1 ? <RenameItemModal isContextMenuButton="no"/> : ""}
            {selectedItemCount === 1 ? <ItemDetailModal isContextMenuButton="no"/> : ""}
            <Button variant="link" onClick={()=>clearSelection()}>Seçimi temizle</Button>
        </div>
    )
}
export default OnItemSelectedView;