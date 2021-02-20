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
import { ADD_SELECTED_ITEM, CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_LOCATION } from '../context/functions';
import axios from 'axios';
import { HTTP_REQUEST } from '../helper/global';

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
    var accessibleId = itemName + "-" + itemType

    var currentLocation   = useSelector(state => state.location);
    var selectedItems     = useSelector(state => state.selectedItems);
    var directoryItems    = useSelector(state => state.directoryItems);
    const store = useStore();
    const selectedItemCount = useSelector(state=>state.selectedItemCount);
    const isItRecycleBin = useSelector(state => state.isItRecycleBin);

    function onItemSelected (event){
      var exist = selectedItems.some((element)=>{return element.name === itemName});
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
    function onItemContextMenu(event){
      var exist = selectedItems.some((element)=>{return element.name === itemName});
      const element = document.getElementById(accessibleId);
      if(!exist){
        store.dispatch(CLEAR_SELECTED_ITEMS());
        store.dispatch(ADD_SELECTED_ITEM(itemObject));
        element.classList.add(styles.itemBlockGridViewActive);
      }

    }
    function onItemDoubleClick(){
      if(!isItRecycleBin)
        if(itemType==="directory"){
          store.dispatch(SET_LOADING(true));
          var newLocation = currentLocation + "/" + itemName;
          store.dispatch(SET_LOCATION(newLocation));
          store.dispatch(CLEAR_SELECTED_ITEMS());
          const element = document.getElementById(accessibleId);
          element.classList.add(styles.itemBlockGridViewActive);
        }
    }
    function removePermanently(){
      let encryptedItems=[];
      let removedItems=[];
      
      for(let i=0; i<selectedItems.length;i++){
          encryptedItems.push(Buffer.from(selectedItems[i].name).toString('base64'));
          removedItems.push(selectedItems[i].name);
      }
      if(encryptedItems.length > 0)
      {
        axios.get("http://192.168.252.128:3030/api/removeItemPermanently",{
          params:{
            "items":encryptedItems,
          }
        }).then((response)=>{
            if(response.data.statu === true) {
              var reduced = directoryItems.filter((element)=> !removedItems.includes(element.name));
              store.dispatch(CLEAR_SELECTED_ITEMS());
              store.dispatch(SET_DIRECTORY_ITEMS(reduced));
            }
            else
              toast.error(response.data.message);
        }).catch((err)=>{
          alert(err)
          store.dispatch(SET_ERROR(true));
          store.dispatch(SET_LOADING(false)); 
        });
      }
    }
    
    function restoreItems(){
      let encryptedItems=[];
      let restoredItems=[];
      for(let i=0; i<selectedItems.length;i++){
          encryptedItems.push({
            absolutePath:Buffer.from(selectedItems[i].absolutePath).toString('base64'),
            restorePath:Buffer.from(selectedItems[i].restorePath).toString('base64')
          });
          restoredItems.push(selectedItems[i].name)
      }
      if(encryptedItems.length > 0)
      {
        
        HTTP_REQUEST.post("/restoreItems",{
            encryptedItems
        }).then((response)=>{
            if(response.data.statu === true) {
              var reduced = directoryItems.filter((element)=> !restoredItems.includes(element.name));
              store.dispatch(CLEAR_SELECTED_ITEMS());
              store.dispatch(SET_DIRECTORY_ITEMS(reduced));
            }
            else
              toast.error(response.data.message);
        }).catch((err)=>{
          alert(err)
          store.dispatch(SET_ERROR(true));
          store.dispatch(SET_LOADING(false)); 
        });
      }
    }

    function handleClick(){
      alert("oko")
    }
    
    return(
      <React.Fragment>
          <div id={accessibleId} className={classNames(styles.itemBlockGridView)}>
              <ContextMenuTrigger id={itemName} >
                <div onContextMenu={(event)=>onItemContextMenu(event)} 
                     onClick={(event)=>onItemSelected(event)} 
                     onDoubleClick={()=>onItemDoubleClick()}>
                  {(itemType==="file")
                    ? <File fileName={itemName} extension={extension} viewMode="grid"/>
                    : <Folder folderName={itemName} folderType={itemType} viewMode="grid"/> 
                  }
                  <span className={styles.tooltiptext}>{itemName}</span>
                  </div>
              </ContextMenuTrigger>
          </div>
          {
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
            )
          }
      </React.Fragment>
    )
  }
  
export default Item;