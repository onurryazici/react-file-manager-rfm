import React from 'react'
import axios from 'axios'
import ItemDetailModal from '../modals/itemDetailModal'
import MoveItemModal from '../modals/moveItemModal'
import RemoveItemModal from '../modals/removeItemModal'
import RenameItemModal from '../modals/renameItemModal'
import styles from '../styles.module.css'
import { size } from 'lodash'
import { toast } from 'material-react-toastify'
import { Button } from 'react-bootstrap'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import { useSelector } from 'react-redux'
import { store } from '../context/store'
import { DownloadItem } from '../helper/events'
import RemoveSharedItemModal from '../modals/removeSharedItemModal'

function SharedWithMeContextMenu(props) {
    var itemName          = props.itemName;
    const selectedItems   = useSelector(state => state.selectedItems);
    const depth           = useSelector(state => state.depth);
    var selectedItemCount = size(selectedItems);
    const canWrite        = !selectedItems.some((element)=> element.write===false);

    function AddToDrive() {
        const API_URL            = store.getState().config.API_URL;
        const API_URL_AddToDrive = store.getState().config.API_URL_AddToDrive;
        const rfmTokenName       = store.getState().config.tokenName;
        let items = []
        selectedItems.forEach(element => {
          items.push(element.absolutePath)
        });
        axios.post(API_URL + API_URL_AddToDrive,{
              "items":items,
              token:localStorage.getItem(rfmTokenName)
        }).then((response)=>{
          if(response.data.statu)
              toast.success("Drive'a eklendi")
        }).catch((err)=>{
          toast.error("Hata : " + err)
        })
    }

    return(
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
            <MenuItem>
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>DownloadItem()}>
                    <div style={{fontSize:'14px'}}>İndir</div>
                </Button>
            </MenuItem>
            <MenuItem>
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>AddToDrive()}>
                    <div style={{fontSize:'14px'}}>Drive'a Ekle</div>
                </Button>
            </MenuItem>
            <MenuItem>
            { (depth!==0)
              ? <MoveItemModal isContextMenuButton="yes" active={canWrite}/>
              : "" }
            </MenuItem>
            <MenuItem>
            { (depth===0)
              ? <RenameItemModal isContextMenuButton="yes" active={true}/>
              : <RenameItemModal isContextMenuButton="yes" active={canWrite}/> }
            </MenuItem>
            <MenuItem>
            { (depth===0)
              ? <RemoveSharedItemModal isContextMenuButton="yes" active={true}/>
              : <RemoveSharedItemModal isContextMenuButton="yes" active={canWrite}/> }
            </MenuItem>
            { selectedItemCount === 1 
              ? <MenuItem><ItemDetailModal isContextMenuButton="yes"/></MenuItem>
              : "" }
        </ContextMenu>       
    )    
}
export default SharedWithMeContextMenu;