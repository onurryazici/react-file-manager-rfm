import React, { useEffect, useRef,useState } from 'react'
import { Button } from 'react-bootstrap'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import Folder from './folder';
import File from './file';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../example/src/context/actions';
function Item(props){
    const itemName  = props.name;
    const itemType  = props.type;
    const extension = props.extension;

    const [itemSelected, setitemSelected] = useState(false);
    const selectedItems     = useSelector(state => state.selectedItems);
    const dispatch          = useDispatch();

    useEffect(() => {
      let exist = selectedItems.indexOf(itemName) === -1 ? false : true;
      if (exist){
        setitemSelected(true);
      }
      else{
        setitemSelected(false);///ara
      }
    },
    [selectedItems]
    );

    function dispatchInvoker(typeValue,payloadValue)
    {
        return dispatch({type:typeValue, payload:payloadValue});
    }
    
    function onItemSelected (event,name){
      var exist = selectedItems.indexOf(name) === -1 ? false : true;
      if(event.ctrlKey)
      {
        if(!exist)
          dispatchInvoker(Actions.ADD_SELECTED_ITEM,name);
      }
      else
      {
        dispatchInvoker(Actions.CLEAR_SELECTED_ITEMS, null);
        dispatchInvoker(Actions.ADD_SELECTED_ITEM,name);
      }
    }
    function onItemContextMenu(event, name){
      var exist = selectedItems.indexOf(name)=== -1 ? false : true;
      if(!exist){
        dispatchInvoker(Actions.CLEAR_SELECTED_ITEMS,null);
        dispatchInvoker(Actions.ADD_SELECTED_ITEM,name);
      }
    }
    return(
      <div>
        <ContextMenuTrigger id="1">
          <div className={classNames(styles.itemBlock,{[styles.itemBlockActive]:itemSelected===true})} 
              onClick={(event)=>onItemSelected(event,itemName)}
              onContextMenu={(event)=>onItemContextMenu(event,itemName)}>
              {(itemType==="folder")
                ? <Folder folderName={itemName}/> 
                : <File fileName={itemName} extension={extension}/>
              }
          </div>
        </ContextMenuTrigger>
        <ContextMenu id="1">
          <div className={styles.contextMenuStage}>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 1' }}>
              Paylaş
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 2' }}>
              İndir
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 3' }}>
              Şuraya Taşı
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 4' }}>
              Yeniden Adlandır
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 5' }}>
              Sil
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 6' }}>
              Ayrıntılar
            </MenuItem>
          </div>
        </ContextMenu>
      </div>
    )
  }
  
export default Item;



