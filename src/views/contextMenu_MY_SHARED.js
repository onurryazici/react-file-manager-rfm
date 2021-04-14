import axios from 'axios';
import { size } from 'lodash';
import { toast } from 'material-react-toastify';
import React from 'react'
import { Button } from 'react-bootstrap';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useSelector, useStore } from 'react-redux';
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING } from '../context/functions';
import CopyItemModal from '../modals/createCopyItemModal';
import ExistShareItemModal from '../modals/existShareItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import MoveItemModal from '../modals/moveItemModal';
import RemoveItemModal from '../modals/removeItemModal';
import RemoveSharedItemModal from '../modals/removeSharedItemModal';
import RenameItemModal from '../modals/renameItemModal';
import styles from '../styles.module.css'
function MySharedContextMenu(props) {
    var itemName          = props.itemName;
    const store           = useStore();
    const directoryItems  = useSelector(state => state.directoryItems)
    const selectedItems   = useSelector(state => state.selectedItems);
    const rfmWindow       = useSelector(state => state.rfmWindow);
    const depth           = useSelector(state => state.depth);
    var selectedItemCount = size(selectedItems);
    const canWrite        = selectedItems[0] !== undefined ? selectedItems[0].write : false;

    const API_URL              = store.getState().config.API_URL;
    const API_URL_MoveToDrive  = store.getState().config.API_URL_MoveToDrive;
    const rfmTokenName         = store.getState().config.tokenName;

    function MoveToDrive(){
        let items      = []
        let movedItems = []
        selectedItems.forEach((element) => {
            items.push(element.absolutePath)
            movedItems.push(element.name)
        })
        axios.post(API_URL + API_URL_MoveToDrive, {
            "items": items,
            token:localStorage.getItem(rfmTokenName)
        })
        .then((response) => {
            if (response.data.statu) {
                var reduced = directoryItems.filter((element)=> !movedItems.includes(element.name));
                store.dispatch(CLEAR_SELECTED_ITEMS());
                store.dispatch(SET_DIRECTORY_ITEMS(reduced));
                toast.success('Paylaşım kaldırıldı.')
            } 
            else toast.error(response.data.message)
        })
        .catch((err) => {
            alert(err)
            store.dispatch(SET_ERROR(true));
            store.dispatch(SET_LOADING(false));
        })
    }
    return(
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
            {
                (depth===0)?
                <MenuItem>
                    <ExistShareItemModal isContextMenuButton="yes" active={true} />
                </MenuItem>
                :""
            }
            <MenuItem>
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>alert("ok")}>
                    <div style={{fontSize:'14px'}}>İndir</div>
                </Button>
            </MenuItem>
            <MenuItem>
            {
                (depth === 0) ?
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>MoveToDrive()}>
                    <div style={{fontSize:'14px'}}>Drive'a dön</div>
                </Button>
                : ""
            }
            </MenuItem>
            <MenuItem>
            {
                (depth!==0)
                ? <MoveItemModal isContextMenuButton="yes" active={canWrite}/>
                : ""
            }
            </MenuItem>
            <MenuItem>
            {
                (depth===0)
                ? <RenameItemModal isContextMenuButton="yes" active={false}/>
                : <RenameItemModal isContextMenuButton="yes" active={canWrite}/>
            }
            </MenuItem>
            <MenuItem>
            {////////////////// DEĞİŞECEK
                (depth===0)
                ? <RemoveSharedItemModal isContextMenuButton="yes" active={true}/>
                : <RemoveSharedItemModal isContextMenuButton="yes" active={canWrite}/>
            }
            </MenuItem>
            {
                selectedItemCount === 1 ?
                <MenuItem>
                    <ItemDetailModal isContextMenuButton="yes"/>
                </MenuItem>
                : ""
            }
          </ContextMenu>       
    )    
}
export default MySharedContextMenu;