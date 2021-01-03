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
    const itemName  = props.name;
    const itemType  = props.type;
    const extension = props.extension;

    const [itemSelected, setitemSelected] = useState(false);
    const currentLocation   = useSelector(state => state.location);
    const selectedItems     = useSelector(state => state.selectedItems);
    const dispatch          = useDispatch();

    useEffect(() => {
      let exist = selectedItems.indexOf(itemName) === -1 ? false : true;
      if (exist){
        setitemSelected(true);
      }
      else{
        setitemSelected(false);
      }
    },
    [selectedItems]
    );

     
    function onItemSelected (event,name){
      var exist = selectedItems.indexOf(name) === -1 ? false : true;
      if(event.ctrlKey)
      {
        if(!exist)
          DispatchCaller(dispatch,Actions.ADD_SELECTED_ITEM,name);
      }
      else
      {
        DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS, null);
        DispatchCaller(dispatch,Actions.ADD_SELECTED_ITEM,name);
      }
    }
    function onItemContextMenu(event, name){
      var exist = selectedItems.indexOf(name)=== -1 ? false : true;
      if(!exist){
        DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS,null);
        DispatchCaller(dispatch,Actions.ADD_SELECTED_ITEM,name);
      }
    }
    function onItemDoubleClick(name,type){
        if(type==="directory"){
          DispatchCaller(dispatch,Actions.SET_LOADING,true);
          let newLocation = currentLocation + "/" + name;
          console.log(currentLocation+ "yy");//////////////////////////////////////// BURADA EKSİK VAR
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
              onDoubleClick={()=>onItemDoubleClick(itemName,itemType)}
              >
              {(itemType==="directory")
                ? <Folder folderName={itemName}/> 
                : <File fileName={itemName} extension={extension}/>
              }
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



