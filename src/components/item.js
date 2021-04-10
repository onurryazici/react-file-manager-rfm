import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import Folder from './folder';
import File from './file';
import classNames from 'classnames'
import RenameItemModal from '../modals/renameItemModal';
import RemoveItemModal from '../modals/removeItemModal';
import NewShareItemModal from '../modals/newShareItemModal';
import MoveItemModal from '../modals/moveItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import styles from '../styles.module.css'
import CopyItemModal from '../modals/createCopyItemModal';
import 'bootstrap/dist/css/bootstrap.css';
import { useInView } from 'react-intersection-observer';
import {  onItemContextMenu,onItemSelected, restoreItems, onItemDoubleClick, removePermanently } from '../helper/events';
import { RFM_WindowType } from '../helper/global';
import ExistShareItemModal from '../modals/existShareItemModal';
import RecycleBinContextMenu from '../views/contextMenu_RECYCLE_BIN';
import DriveContextMenu from '../views/contextMenu_DRIVE';
import SharedWithMeContextMenu from '../views/contextMenu_SHARED_WITH_ME';

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
    const rfmWindow         = useSelector(state => state.rfmWindow);
    const [ref, inView] = useInView({
      threshold: 0,
    })


    return(
      <React.Fragment>
          <div ref={ref} id={accessibleId} className={classNames(styles.itemBlockGridView)}>
            {
              <ContextMenuTrigger id={itemName} >
                <div onContextMenu={()=>onItemContextMenu(accessibleId,itemName,itemObject)} 
                     onClick={(event)=>onItemSelected(event,accessibleId,itemName,itemObject)} 
                     onDoubleClick={()=>onItemDoubleClick(accessibleId,itemType,itemName,absolutePath,extension)}>
                  {(itemType==="file")
                    ? <File fileName={itemName} extension={extension} viewMode="grid" image={_image} absolutePath={absolutePath}/>
                    : <Folder folderName={itemName} folderType={itemType} viewMode="grid"/> 
                  }
                  <span className={styles.tooltiptext}>{itemName}</span>
                  </div>
              </ContextMenuTrigger>
            }
              
          </div>
          
          {
            inView ?
            rfmWindow === RFM_WindowType.RECYCLE_BIN 
            ? (<RecycleBinContextMenu itemName={itemName}/>)
            : 
            
            rfmWindow === RFM_WindowType.DRIVE 
            ? (<DriveContextMenu itemName={itemName}/>)
            : 

            (rfmWindow === RFM_WindowType.MY_SHARED || rfmWindow === RFM_WindowType.SHARED_WITH_ME)
            ? (<SharedWithMeContextMenu itemName={itemName}/>)
            :""
            :""
          }
      </React.Fragment>
    )
  }
  
export default Item;
