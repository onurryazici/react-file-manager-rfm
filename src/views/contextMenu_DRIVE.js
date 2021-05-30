import { size } from 'lodash';
import React from 'react'
import { Button } from 'react-bootstrap';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useSelector, useStore } from 'react-redux';
import { DownloadItem } from '../helper/events';
import CopyItemModal from '../modals/createCopyItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import MoveItemModal from '../modals/moveItemModal';
import NewShareItemModal from '../modals/newShareItemModal';
import RemoveItemModal from '../modals/removeItemModal';
import RenameItemModal from '../modals/renameItemModal';
import styles from '../styles.module.css'
function DriveContextMenu(props) {
    var itemName          = props.itemName;
    const selectedItems   = useSelector(state => state.selectedItems);
    return(
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
            {
                size(selectedItems) === 1 ?
                  <MenuItem>
                      <NewShareItemModal isContextMenuButton="yes"/>
                  </MenuItem>
                : ""
            }
            <MenuItem>
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>DownloadItem()}>
                    <div style={{fontSize:'14px'}}>İndir</div>
                </Button>
            </MenuItem>
            <MenuItem>
                <CopyItemModal isContextMenuButton="yes" active={true}/>
            </MenuItem>
            <MenuItem>
                <MoveItemModal isContextMenuButton="yes" active={true}/>
            </MenuItem>
            {
                size(selectedItems) === 1 ?
                <MenuItem>
                    <RenameItemModal isContextMenuButton="yes" active={true}/>
                </MenuItem>
                : ""
            }
            <MenuItem>
                <RemoveItemModal isContextMenuButton="yes" active={true}/>
            </MenuItem>
            {
                size(selectedItems) === 1 ?
                <MenuItem>
                    <ItemDetailModal isContextMenuButton="yes"/>
                </MenuItem>
                : ""
            }
          </ContextMenu>       
    )    
}
export default DriveContextMenu;