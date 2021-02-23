import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useStore } from 'react-redux';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ADD_SELECTED_ITEM, CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_LOCATION, SET_PREVIEW_ACTIVE, SET_PREVIEW_DATA } from '../context/functions';
import { HTTP_REQUEST } from '../helper/global';
import axios from 'axios';
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
import ItemPreviewModal from '../modals/itemPreviewModal';
import { useInView } from 'react-intersection-observer';
import {  onItemContextMenu,onItemSelected } from '../helper/test';

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
    var currentLocation       = useSelector(state => state.location);
    var selectedItems         = useSelector(state => state.selectedItems);
    var directoryItems        = useSelector(state => state.directoryItems);
    const [_image, set_image] = useState("")

    const store             = useStore();
    const selectedItemCount = useSelector(state=>state.selectedItemCount);
    const isItRecycleBin    = useSelector(state => state.isItRecycleBin);
    const [itemSelected, setItemSelected] = useState(false);
    const [ref, inView] = useInView({
      threshold: 0.3,
    })

    /*function onItemSelected (event){
      console.log("tıklandı")
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
      setItemSelected(true);
     // element.classList.add(styles.itemBlockGridViewActive); 
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
      {
        if(itemType==="directory"){
          store.dispatch(SET_LOADING(true));
          var newLocation = currentLocation + "/" + itemName;
          store.dispatch(SET_LOCATION(newLocation));
          store.dispatch(CLEAR_SELECTED_ITEMS());
          const element = document.getElementById(accessibleId);
          element.classList.add(styles.itemBlockGridViewActive);
        }
        else if (extension==="png" || extension === "jpg" || extension === "jpeg")
        {
           HTTP_REQUEST.get('/getImage',{
             params:{
               absolutePath:Buffer.from(absolutePath).toString('base64')
             }
           }).then((response)=>{
             console.log(response.data)
             store.dispatch(SET_PREVIEW_DATA(response.data))
             store.dispatch(SET_PREVIEW_ACTIVE(true))
           })
        }
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
    }*/

   /* function handleClick(){
      alert("oko")
    }
    
    console.log("work")*/
    return(
      <React.Fragment>
          <div ref={ref} id={accessibleId} className={classNames(styles.itemBlockGridView,itemSelected ? styles.itemBlockGridViewActive : "")}>
            {
              inView?
              <ContextMenuTrigger id={itemName} >
                <div onContextMenu={(event)=>onItemSelected(event,accessibleId,itemName,itemObject)} 
                     onClick={(event)=>onItemSelected(event,accessibleId,itemName,itemObject)} 
                     onDoubleClick={()=>onItemSelected(event,accessibleId,itemName,itemObject)}>
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
