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
import { RFM_WindowType } from '../helper/global';
import ExistShareItemModal from '../modals/existShareItemModal';

function OnItemSelectedView() {
    const store = useStore();
    const rfmWindow = useSelector(state => state.rfmWindow);
    function clearSelection(){
        store.dispatch(CLEAR_SELECTED_ITEMS(null));
    }
    return (
        <div>
            {
                rfmWindow === RFM_WindowType.DRIVE
                ? <NewShareItemModal isContextMenuButton="no" active={true}/>
                : 

                rfmWindow === RFM_WindowType.MY_SHARED
                ? <ExistShareItemModal isContextMenuButton="no" active={true}/>
                :""
            }
            
            
            
            <RemoveItemModal isContextMenuButton="no"/>
            <MoveItemModal isContextMenuButton="no"/>
            <CopyItemModal isContextMenuButton="no"/>
            <RenameItemModal isContextMenuButton="no"/> 
            <ItemDetailModal isContextMenuButton="no"/>
            <Button variant="link" onClick={()=>clearSelection()}>Seçimi temizle</Button>
        </div>
    )
}
export default OnItemSelectedView;