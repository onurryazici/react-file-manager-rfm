import React from 'react'
import { Button } from 'react-bootstrap'
import NewShareItemModal from '../modals/newShareItemModal'
import RemoveItemModal from '../modals/removeItemModal'
import MoveItemModal from '../modals/moveItemModal'
import RenameItemModal from '../modals/renameItemModal'
import CopyItemModal from '../modals/createCopyItemModal'
import ItemDetailModal from '../modals/itemDetailModal'
import { CLEAR_SELECTED_ITEMS } from '../redux/functions'
import { useSelector, useStore } from 'react-redux'
import { RFM_WindowType } from '../helper/global'
import ExistShareItemModal from '../modals/existShareItemModal'
import RemoveSharedItemModal from '../modals/removeSharedItemModal'
import { size } from 'lodash'

function OnItemSelectedView() {
    const RFM_Store         = useStore()
    const rfmWindow         = useSelector(state => state.rfmWindow)
    const selectedItems     = useSelector(state => state.selectedItems)
    const depth             = useSelector(state => state.depth)
    const canWrite          = !selectedItems.some((element) => element.write===false)
    function clearSelection(){
        RFM_Store.dispatch(CLEAR_SELECTED_ITEMS(null))
    }
    return (
        <div>
            {
                (rfmWindow === RFM_WindowType.DRIVE && size(selectedItems) === 1)
                ? <NewShareItemModal isContextMenuButton="no" active={true}/>
                : 

                (rfmWindow === RFM_WindowType.MY_SHARED && depth===0 && size(selectedItems) === 1)
                ? <ExistShareItemModal isContextMenuButton="no" active={true}/>
                :

                (rfmWindow === RFM_WindowType.SHARED_WITH_ME && depth===0 && size(selectedItems) === 1)
                ? <ExistShareItemModal isContextMenuButton="no" active={true}/>
                : ""
            }
            {
                (rfmWindow === RFM_WindowType.DRIVE)
                ? <RemoveItemModal isContextMenuButton="no" active={canWrite}/>
                :

                (rfmWindow === RFM_WindowType.MY_SHARED || rfmWindow == RFM_WindowType.SHARED_WITH_ME)
                ? <RemoveSharedItemModal isContextMenuButton="no" active={canWrite}/> 
                : ""
            }
            
                <MoveItemModal isContextMenuButton="no" active={canWrite}/>
            {
                (rfmWindow === RFM_WindowType.MY_SHARED || rfmWindow === RFM_WindowType.SHARED_WITH_ME) 
                ? ""
                : <CopyItemModal isContextMenuButton="no" active={canWrite}/>
            }
            <RenameItemModal isContextMenuButton="no" active={selectedItems[0].write && size(selectedItems) === 1}/> 
            {
                (size(selectedItems)===1)
                ? <ItemDetailModal isContextMenuButton="no"/>   
                : ""
            }
            <Button variant="link" onClick={()=>clearSelection()}>Seçimi temizle</Button>
        </div>
    )
}
export default OnItemSelectedView