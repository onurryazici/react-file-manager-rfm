import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
import { DispatchCaller } from '../helper/global';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import CopyItemModal from '../modals/copyItemModal';

function Item(props){
    var itemName  = props.name;
    var itemType  = props.type;
    var itemOwner = props.owner;
    var extension = props.extension;
    var size      = props.size;
    var read      = props.read;
    var write     = props.write;
    var lastAccessTime = props.lastAccessTime;
    var lastModifyTime = props.lastModifyTime;
    var itemObject={
      name:itemName,
      type:itemType, 
      owner:itemOwner,
      extension:extension,
      size:size,
      read:read,
      write:write,
      lastAccessTime:lastAccessTime,
      lastModifyTime:lastModifyTime,
    }


    var [itemSelected, setitemSelected] = useState(false);
    var currentLocation   = useSelector(state => state.location);
    var selectedItems     = useSelector(state => state.selectedItems);
    var dispatch          = useDispatch();

    useEffect(() => {
      let exist = selectedItems.some((element)=>{return element.name===itemName});
      if (exist){
        setitemSelected(true);
      }
      else{
        setitemSelected(false);
      }
    },[selectedItems]);
     
    function onItemSelected (event,nameParam){
      var exist = selectedItems.some((element)=>{return element.name === nameParam});
      if(event.ctrlKey)
      {
        if(!exist){
          
          DispatchCaller(dispatch,Actions.ADD_SELECTED_ITEM,itemObject);
        }
      }
      else 
      {
        DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS, null);
        DispatchCaller(dispatch,Actions.ADD_SELECTED_ITEM,itemObject);
      }
      
    }
    function onItemContextMenu(event, nameParam){
      var exist = selectedItems.some((element)=>{return element.name === nameParam});
      if(!exist){
        DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS,null);
        DispatchCaller(dispatch,Actions.ADD_SELECTED_ITEM,itemObject);
      }
    }
    function onItemDoubleClick(name,type){
        if(type==="directory"){
          DispatchCaller(dispatch,Actions.SET_LOADING,true);
          var newLocation = currentLocation + "/" + name;
          console.log(newLocation+ "yy");//////////////////////////////////////// BURADA EKSİK VAR
          DispatchCaller(dispatch,Actions.SET_LOCATION,newLocation);
          DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS,null);
        }
    }
    function handleClick(e, data) {
      alert("oko")
    }
    return(
      <div>
        <ContextMenuTrigger id={itemName}>
          <div className={classNames(styles.itemBlock,{[styles.itemBlockActive]:itemSelected===true})} 
              onClick={(event)=>onItemSelected(event,itemName)}
              onContextMenu={(event)=>onItemContextMenu(event,itemName)}
              onDoubleClick={()=>onItemDoubleClick(itemName,itemType)}>
              {(itemType==="file")
                ? <File fileName={itemName} extension={extension}/>
                : <Folder folderName={itemName} folderType={itemType}/> 
              }
              <span className={styles.tooltiptext}>{itemName}</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
        <MenuItem>
            <ShareItemModal isContextMenuButton="yes"/>
        </MenuItem>
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
        <MenuItem>
            <RenameItemModal isContextMenuButton="yes"/>
        </MenuItem>
        <MenuItem>
          <RemoveItemModal isContextMenuButton="yes"/>
            </MenuItem>
        <MenuItem>
            <ItemDetailModal isContextMenuButton="yes"/>
        </MenuItem>
      </ContextMenu>
      </div>
    )
  }
  
export default Item;



