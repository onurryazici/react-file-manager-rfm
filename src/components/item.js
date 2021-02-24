import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import Folder from './folder';
import File from './file';
import classNames from 'classnames'
import RenameItemModal from '../modals/renameItemModal';
import RemoveItemModal from '../modals/removeItemModal';
import ShareItemModal from '../modals/shareItemModal';
import MoveItemModal from '../modals/moveItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import styles from '../styles.module.css'
import CopyItemModal from '../modals/createCopyItemModal';
import 'bootstrap/dist/css/bootstrap.css';
import { useInView } from 'react-intersection-observer';
import {  onItemContextMenu,onItemSelected, restoreItems, onItemDoubleClick } from '../helper/events';

function Item(props){
    var itemName  = props.name;
    var itemType  = props.type;
    var itemOwner = props.owner;
    var extension = props.extension;
    var absolutePath = props.absolutePath;
    var size      = props.size;
    var read      = props.read;
    var write     = props.write;
    var sharedWith = props.sharedWith;
    var lastAccessTime = props.lastAccessTime;
    var lastModifyTime = props.lastModifyTime;
    var restorePath    = props.restorePath;
    var itemObject={
      name:itemName,
      type:itemType, 
      owner:itemOwner,
      extension:extension,
      absolutePath:absolutePath,
      size:size,
      read:read,
      write:write,
      lastAccessTime:lastAccessTime,
      lastModifyTime:lastModifyTime,
      sharedWith:sharedWith,
      restorePath:restorePath
    }
    var accessibleId          = itemName + "-" + itemType
    const [_image, set_image] = useState("")

    const selectedItemCount = useSelector(state=>state.selectedItemCount);
    const isItRecycleBin    = useSelector(state => state.isItRecycleBin);
    const [ref, inView] = useInView({
      threshold: 0.3,
    })


    return(
      <React.Fragment>
          <div ref={ref} id={accessibleId} className={classNames(styles.itemBlockGridView)}>
            {
              inView?
              <ContextMenuTrigger id={itemName} >
                <div onContextMenu={()=>onItemContextMenu(accessibleId,itemName,itemObject)} 
                     onClick={(event)=>onItemSelected(event,accessibleId,itemName,itemObject)} 
                     onDoubleClick={()=>onItemDoubleClick(accessibleId,itemType,itemName,absolutePath,extension)}>
                  {(itemType==="file")
                    ? <File fileName={itemName} extension={extension} viewMode="grid" image={_image}/>
                    : <Folder folderName={itemName} folderType={itemType} viewMode="grid"/> 
                  }
                  <span className={styles.tooltiptext}>{itemName}</span>
                  </div>
              </ContextMenuTrigger>
              :""
            }
              
          </div>
          
          {
            inView?
            isItRecycleBin 
            ?(
              <ContextMenu id={itemName} className={styles.contextMenuStage}>
                {[
                    <MenuItem>
                        <Button variant="light" className={styles.contextMenuItem} onClick={() => removePermanently()}>
                            <div style={{fontSize:'14px'}}>Tamamen Sil</div>
                        </Button>
                    </MenuItem>,
                    <MenuItem>
                        <Button variant="light" className={styles.contextMenuItem} onClick={() => restoreItems()}>
                            <div style={{fontSize:'14px'}}>Geri Yükle</div>
                        </Button>
                    </MenuItem>
                ]}
                </ContextMenu>
            ) : (
              <ContextMenu id={itemName} className={styles.contextMenuStage}>
                {
                    selectedItemCount > 1 
                    ? "" 
                    :
                    ( 
                    <MenuItem>
                        <ShareItemModal isContextMenuButton="yes"/>
                    </MenuItem>
                    )
                }
                <MenuItem>
                    <Button variant="light" className={styles.contextMenuItem} onClick={()=>alert("ok")}>
                        <div style={{fontSize:'14px'}}>İndir</div>
                    </Button>
                </MenuItem>
                <MenuItem>
                    <CopyItemModal isContextMenuButton="yes"/>
                </MenuItem>
                <MenuItem>
                    <MoveItemModal isContextMenuButton="yes"/>
                </MenuItem>
                {
                    selectedItemCount > 1 
                    ? "" 
                    :
                    ( 
                    <MenuItem>
                        <RenameItemModal isContextMenuButton="yes"/>
                    </MenuItem>
                    )
                }
                <MenuItem>
                    <RemoveItemModal isContextMenuButton="yes"/>
                </MenuItem>
                {
                    selectedItemCount > 1 
                    ? "" 
                    :
                    ( 
                    <MenuItem>
                        <ItemDetailModal isContextMenuButton="yes"/>
                    </MenuItem>
                    )
                }
              </ContextMenu>
            )
            :""
          }
      </React.Fragment>
    )
  }
  
export default Item;
