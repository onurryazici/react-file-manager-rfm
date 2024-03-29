import React from 'react'
import ExistShareItemModal from '../modals/existShareItemModal'
import ItemDetailModal from '../modals/itemDetailModal'
import MoveItemModal from '../modals/moveItemModal'
import RemoveSharedItemModal from '../modals/removeSharedItemModal'
import RenameItemModal from '../modals/renameItemModal'
import styles from '../styles.module.css'
import { size } from 'lodash'
import { Button } from 'react-bootstrap'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import { useSelector } from 'react-redux'
import { DownloadItem, MoveToDrive } from '../helper/events'

function MySharedContextMenu(props) {
    var itemName            = props.itemName
    const selectedItems     = useSelector(state => state.selectedItems)
    const depth             = useSelector(state => state.depth)
    const canWrite          = !selectedItems.some((element)=> element.write===false)
    return(
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
            { (depth===0)
              ? <MenuItem><ExistShareItemModal isContextMenuButton="yes" active={true} /></MenuItem>
              : ""}
            <MenuItem>
                <Button variant="light" className={styles.contextMenuItem} onClick={()=>DownloadItem()}>
                    <div style={{fontSize:'14px'}}>İndir</div>
                </Button>
            </MenuItem>
            <MenuItem>
            { (depth === 0) 
              ? <Button variant="light" className={styles.contextMenuItem} onClick={()=>MoveToDrive()}>
                	<div style={{fontSize:'14px'}}>Drive'a dön</div>
                </Button>
            : ""}
            </MenuItem>
            <MenuItem>
            { (depth!==0)
              ? <MoveItemModal isContextMenuButton="yes" active={canWrite}/>
              : ""
            }
            </MenuItem>
            <MenuItem>
            { (depth===0)
              ? <RenameItemModal isContextMenuButton="yes" active={false}/>
              : <RenameItemModal isContextMenuButton="yes" active={canWrite}/> }
            </MenuItem>
            <MenuItem>
            { (depth===0)
              ? <RemoveSharedItemModal isContextMenuButton="yes" active={true}/>
              : <RemoveSharedItemModal isContextMenuButton="yes" active={canWrite}/> }
            </MenuItem>
            { size(selectedItems) === 1 
              ? <MenuItem><ItemDetailModal isContextMenuButton="yes"/></MenuItem>
              : "" }
          </ContextMenu>       
    )    
}
export default MySharedContextMenu