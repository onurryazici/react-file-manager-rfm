import { size } from 'lodash';
import React from 'react'
import { Button } from 'react-bootstrap';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useSelector, useStore } from 'react-redux';
import { DownloadItem, MoveToDrive } from '../helper/events';
import ExistShareItemModal from '../modals/existShareItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import MoveItemModal from '../modals/moveItemModal';
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
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>DownloadItem()}>
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
            {////////////////// canWrite değişkeni güncellenebilir..
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