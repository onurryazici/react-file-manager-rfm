import React, { useRef,useState } from 'react'
import { Button } from 'react-bootstrap'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import Folder from './folder';
import File from './file';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import classNames from 'classnames'
import { useSelector } from 'react-redux';
function Item(props){
    const itemName = props.name;
    const itemType = props.type;
    const extension = props.extension;
    const isFolder = (itemType==="folder") ? true : false;
    const elementReference = useRef(null);
    const [itemSelected, setitemSelected] = useState(false)
    const currentLocation = useSelector(state => state.currentLocation);

    function onItemSelected (itemId,dispatch)  {
      if(itemSelected){
        setitemSelected(false)
        dispatch({type:"LEAVE_ITEM",payload:itemId});
      }
      else{
        setitemSelected(true) 
        dispatch({type:"SELECT_ITEM",payload:itemId});
      }
    }
    function onItemLeave ()  {
     /* setitemSelected(false)
      dispatch({type:"LEAVE_ITEM",payload:""});*/
    }
    return(
      <div>
        <ContextMenuTrigger id="1">
          <div className={classNames(styles.itemBlock,{[styles.itemBlockActive]:itemSelected===true})} 
              onClick={()=>onItemSelected()}
              onContextMenu={()=>onItemSelected()}>
              {isFolder
                ? <Folder folderName={itemName}/> 
                : <File fileName={itemName} />
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



