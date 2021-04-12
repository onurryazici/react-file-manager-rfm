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
    const selectedItems = useSelector(state => state.selectedItems);
    const selectedItemCount = useSelector(state => state.selectedItemCount)
    const depth         = useSelector(state => state.depth);
    const canWrite      = selectedItems.filter(item => item.write===false).length > 0 ? true : false;
    function clearSelection(){
        store.dispatch(CLEAR_SELECTED_ITEMS(null));
    }
    return (
        <div>
            {
                (rfmWindow === RFM_WindowType.DRIVE && selectedItemCount === 1)
                ? <NewShareItemModal isContextMenuButton="no" active={true}/>
                : 

                (rfmWindow === RFM_WindowType.MY_SHARED && depth===0 && selectedItemCount === 1)
                ? <ExistShareItemModal isContextMenuButton="no" active={true}/>
                :

                (rfmWindow === RFM_WindowType.SHARED_WITH_ME && depth===0 && selectedItemCount === 1)
                ? <ExistShareItemModal isContextMenuButton="no" active={true}/>
                : ""
            }
            
            
            
            <RemoveItemModal isContextMenuButton="no" active={
                selectedItems.filter(item => item.write===false).length > 0 ? false : true
            }/>
            <MoveItemModal isContextMenuButton="no" active={
                selectedItems.filter(item => item.write===false).length > 0 ? false : true
            }/>
            {
                (rfmWindow === RFM_WindowType.MY_SHARED || rfmWindow === RFM_WindowType.SHARED_WITH_ME) 
                ? ""
                : 
                <CopyItemModal isContextMenuButton="no" active={
                    selectedItems.filter(item => item.write===false).length > 0 ? false : true
                }/>
            }
            <RenameItemModal isContextMenuButton="no" active={selectedItems[0].write && selectedItemCount === 1}/> 
            <ItemDetailModal isContextMenuButton="no"/>
            <Button variant="link" onClick={()=>clearSelection()}>Seçimi temizle</Button>
        </div>
    )
}
export default OnItemSelectedView;