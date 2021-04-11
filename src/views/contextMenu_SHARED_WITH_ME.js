import { size } from 'lodash';
import React from 'react'
import { Button } from 'react-bootstrap';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useSelector, useStore } from 'react-redux';
import CopyItemModal from '../modals/createCopyItemModal';
import ExistShareItemModal from '../modals/existShareItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import MoveItemModal from '../modals/moveItemModal';
import RemoveItemModal from '../modals/removeItemModal';
import RenameItemModal from '../modals/renameItemModal';
import styles from '../styles.module.css'
function SharedWithMeContextMenu(props) {
    var itemName          = props.itemName;
    const store           = useStore();
    const selectedItems   = useSelector(state => state.selectedItems);
    const rfmWindow       = useSelector(state => state.rfmWindow);
    const depth           = useSelector(state => state.depth);
    var selectedItemCount = size(selectedItems);
    const canWrite        = selectedItems[0] !== undefined ? selectedItems[0].write : false;
    return(
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
            {/*
                (selectedItemCount === 1 && depth === 0 && selectedItems[0].write===true)?
                  <MenuItem>
                      <ExistShareItemModal isContextMenuButton="yes"/>
                  </MenuItem>
                : ""*/
            }
            <MenuItem>
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>alert("ok")}>
                    <div style={{fontSize:'14px'}}>İndir</div>
                </Button>
            </MenuItem>
            <MenuItem>
            {
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>alert("ok")}>
                    <div style={{fontSize:'14px'}}>Drive'a Ekle</div>
                </Button>
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
                ? <RenameItemModal isContextMenuButton="yes" active={true}/>
                : <RenameItemModal isContextMenuButton="yes" active={canWrite}/>
            }
            </MenuItem>
            
            <MenuItem>
            {
                (depth===0)
                ? <RemoveItemModal isContextMenuButton="yes" active={true}/>
                : <RemoveItemModal isContextMenuButton="yes" active={canWrite}/>
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
export default SharedWithMeContextMenu;