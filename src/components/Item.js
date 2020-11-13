import React, { useRef,useState } from 'react'
import { Button } from 'react-bootstrap'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import Folder from './folder';
import File from './file';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import RfmConsumer from '../../example/src/context';
import classNames from 'classnames'
function Item(props){
    const itemId   = props.id;
    const itemName = props.itemName;
    const itemType = props.type;
    const isFolder = (itemType==="folder") ? true : false;
    const elementReference = useRef(null);
    const [itemSelected, setitemSelected] = useState(false)


    function onItemSelected (itemId,dispatch,element)  {
      itemSelected ? setitemSelected(false) : setitemSelected(true)
      dispatch({type:"SELECT_ITEM",payload:itemId});
    }
    return(
      <div>
        <ContextMenuTrigger id="1">
          <RfmConsumer>
          {
            value=>{
              const {dispatch} = value;  
              return (
                <div className={classNames(styles.itemBlock,{[styles.itemBlockActive]:itemSelected===true})} 
                      onClick={()=>onItemSelected(itemId,dispatch,elementReference)}
                      onBlur={()=>onItemLeave(dispatch)}>
                      {isFolder
                          ? <Folder folderName={itemName}/>
                          : <File fileName={itemName} />
                      }
                </div>
              )
            }
          }
        </RfmConsumer>
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



function onItemLeave (dispatch)  {
  Item.setitemSelected(false)
  dispatch({type:"LEAVE_ITEM",payload:""});
}