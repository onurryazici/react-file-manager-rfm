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
import RenameItemModal from '../modals/renameItemModal';

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
    function onItemDoubleClick(name,type){
        if(type==="folder"){
          dispatchInvoker(Actions.SET_LOADING,true);
          let newLocation = currentLocation + "/" + name;
          dispatchInvoker(Actions.SET_LOCATION,newLocation);
          dispatchInvoker(Actions.CLEAR_SELECTED_ITEMS,null);
        }
    }
    function handleClick(e, data) {
      console.log(data.foo);
    }
    return(
      <div>
        <ContextMenuTrigger id="1">
          <div className={classNames(styles.itemBlock,{[styles.itemBlockActive]:itemSelected===true})} 
              onClick={(event)=>onItemSelected(event,itemName)}
              onContextMenu={(event)=>onItemContextMenu(event,itemName)}
              onDoubleClick={()=>onItemDoubleClick(itemName,itemType)}
              >
              {(itemType==="folder")
                ? <Folder folderName={itemName}/> 
                : <File fileName={itemName} extension={extension}/>
              }
          </div>
        </ContextMenuTrigger>
        <ContextMenu id="1" className={styles.contextMenuStage}>
          
        <ContextMenu id="1">
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          ContextMenu Item 1
        </MenuItem>
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{foo: 'bar'}} onClick={handleClick}>
          ContextMenu Item 3
        </MenuItem>
      </ContextMenu>
           {/* <MenuItem data={{ item: 'item 2' }}>
              <button type="button" className={styles.contextMenuItem} onClick={()=>{}}>İndir</button>
            </MenuItem>
            <MenuItem data={{ item: 'item 3' }}>
              <button type="button" className={styles.contextMenuItem} onClick={()=>{}}>Şuraya taşı</button>
            </MenuItem>
            <MenuItem data={{ item: 'item 4' }} >
              <RenameItemModal onClick={()=>alert("")}/>
            </MenuItem>
            <MenuItem data={{ item: 'item 5' }}>
              <button type="button" className={styles.contextMenuItem} onClick={()=>{}}>Sil</button>
            </MenuItem>
            <MenuItem data={{ item: 'item 6' }}>
              <button type="button" className={styles.contextMenuItem} onClick={()=>{}}>Ayrıntılar</button>
            </MenuItem>*/}
        </ContextMenu>
      </div>
    )
  }
  
export default Item;



