import { ADD_SELECTED_ITEM, CLEAR_SELECTED_ITEMS } from '../context/functions';
import { initialState } from '../context/store'
import {store} from '../context/store'
import styles from '../styles.module.css'
export function onItemSelected(event,accessibleId,itemName,itemObject){

    const selectedItems = initialState.selectedItems;
    var exist = selectedItems.some((element)=>{ return element.name === itemName});
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

export function onItemContextMenu(event,accessibleId,itemName,itemObject){
    var exist = selectedItems.some((element)=>{return element.name === itemName});
    const element = document.getElementById(accessibleId);
    if(!exist){
      store.dispatch(CLEAR_SELECTED_ITEMS());
      store.dispatch(ADD_SELECTED_ITEM(itemObject));
      element.classList.add(styles.itemBlockGridViewActive);
    }

  }

  