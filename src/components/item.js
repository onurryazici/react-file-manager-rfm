import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { Actions } from '../context/actions';
import Folder from './folder';
import File from './file';
import classNames from 'classnames'
import RenameItemModal from '../modals/renameItemModal';
import RemoveItemModal from '../modals/removeItemModal';
import ShareItemModal from '../modals/shareItemModal';
import MoveItemModal from '../modals/moveItemModal';
import ItemDetailModal from '../modals/itemDetailModal';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import CopyItemModal from '../modals/createCopyItemModal';
import { ADD_SELECTED_ITEM, CLEAR_SELECTED_ITEMS, SET_LOADING, SET_LOCATION } from '../context/functions';

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
      sharedWith:sharedWith
    }
    var accessibleId = itemName + "-" + itemType
    // id ile itemlara eriş ve değiştir
    // selectedItems ile seçilenleri kaldır 

    var [itemSelected, setitemSelected] = useState(false);
    var currentLocation   = useSelector(state => state.location);
    var selectedItems     = useSelector(state => state.selectedItems);
    
    const store = useStore();
    const selectedItemCount = useSelector(state=>state.selectedItemCount);
    const isItRecycleBin = useSelector(state => state.isItRecycleBin);
    function onItemSelected (event,nameParam){
      var exist = selectedItems.some((element)=>{return element.name === nameParam});
      const element = document.getElementById(accessibleId);
      if(event.ctrlKey)
      {
        if(!exist){
          store.dispatch(ADD_SELECTED_ITEM(itemObject))
        }
      }
      else 
      {
        store.dispatch(CLEAR_SELECTED_ITEMS());
        store.dispatch(ADD_SELECTED_ITEM(itemObject));
      }
      element.classList.add(styles.itemBlockGridViewActive);
      
    }
    function onItemContextMenu(event, nameParam){
      var exist = selectedItems.some((element)=>{return element.name === nameParam});
      const element = document.getElementById(accessibleId);
      if(!exist){
        store.dispatch(CLEAR_SELECTED_ITEMS());
        store.dispatch(ADD_SELECTED_ITEM(itemObject));
        element.classList.add(styles.itemBlockGridViewActive);
      }
    }
    function onItemDoubleClick(name,type){
        if(type==="directory"){
          store.dispatch(SET_LOADING(true));
          var newLocation = currentLocation + "/" + name;
          store.dispatch(SET_LOCATION(newLocation));
          store.dispatch(CLEAR_SELECTED_ITEMS());
          const element = document.getElementById(accessibleId);
          element.classList.add(styles.itemBlockGridViewActive);
        }
    }
    function handleClick(e, data) {
      alert("oko")
    }
    return(
      <React.Fragment>
          <div id={accessibleId} className={classNames(styles.itemBlockGridView)} 
              onClick={(event)=>onItemSelected(event,itemName)}
              onContextMenu={(event)=>onItemContextMenu(event,itemName)}
              onDoubleClick={()=>onItemDoubleClick(itemName,itemType)}>
          <ContextMenuTrigger id={itemName}>

              {(itemType==="file")
                ? <File fileName={itemName} extension={extension} viewMode="grid"/>
                : <Folder folderName={itemName} folderType={itemType} viewMode="grid"/> 
              }
              <span className={styles.tooltiptext}>{itemName}</span>
        </ContextMenuTrigger>

          </div>
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
              <Button variant="light" className={styles.contextMenuItem} onClick={handleClick}>
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
      
      
      </React.Fragment>
    )
  }
  
export default Item;



