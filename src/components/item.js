import React, { useRef,useState } from 'react'
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

    const currentLocation   = useSelector(state => state.currentLocation);
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const selectedItems     = useSelector(state => state.selectedItems);
    const dispatch          = useDispatch();

    function onItemSelected (event,name){
      if(event.ctrlKey)
      {

      }
        ()=>{dispatch({type:Actions.CLEAR_SELECTED_ITEMS, payload:itemName});}
        ()=>{dispatch({type:Actions.SET_SELECTED_ITEMS, payload:itemName});}
      
      console.log("SELECTED ITEMS " +selectedItems);
      
    }
    return(
      <div>
        <ContextMenuTrigger id="1">
          <div className={classNames(styles.itemBlock,{[styles.itemBlockActive]:itemSelected===true})} 
              onClick={(event)=>onItemSelected(event,itemName)}
              onContextMenu={()=>onItemSelected()}>
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



