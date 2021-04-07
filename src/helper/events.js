import axios from 'axios';
import { ADD_SELECTED_ITEM, CLEAR_SELECTED_ITEMS, INCREASE_DEPTH, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_LOCATION, SET_PREVIEW_ACTIVE, SET_PREVIEW_DATA } from '../context/functions';
import {store} from '../context/store'
import styles from '../styles.module.css'
import { RFM_WindowType } from './global';

export function onItemSelected(event,accessibleId,itemName,itemObject){
    const selectedItems = store.getState().selectedItems;
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
export function onItemDoubleClick(accessibleId,itemType,itemName,_absolutePath,extension){
    const rfmWindow        = store.getState().rfmWindow;
    const currentLocation  = store.getState().location;
    const API_URL          = store.getState().config.API_URL;
    const API_URL_GetImage = store.getState().config.API_URL_GetImage;

    if(!(rfmWindow===RFM_WindowType.RECYCLE_BIN))
    {
      if(itemType==="directory"){
        store.dispatch(SET_LOADING(true));
        var newLocation = currentLocation + "/" + itemName;
        store.dispatch(SET_LOCATION(newLocation));
        store.dispatch(CLEAR_SELECTED_ITEMS());
        store.dispatch(INCREASE_DEPTH());
        const element = document.getElementById(accessibleId);
        element.classList.add(styles.itemBlockGridViewActive);
      }
      else if (extension==="png" || extension === "jpg" || extension === "jpeg")
      {
        store.dispatch(SET_PREVIEW_ACTIVE(true))
        store.dispatch(SET_PREVIEW_DATA(`${API_URL + API_URL_GetImage}?absolutePath=${_absolutePath}`));
         /*axios.post(API_URL + API_URL_GetImage,{
             absolutePath:_absolutePath
         }).then((response)=>{
           store.dispatch(SET_PREVIEW_DATA(response.data))
         })*/
      }
    }
      
}
export function onItemContextMenu(accessibleId,itemName,itemObject){
    const selectedItems = store.getState().selectedItems;
    var exist = selectedItems.some((element)=>{return element.name === itemName});
    const element = document.getElementById(accessibleId);
    if(!exist){
      store.dispatch(CLEAR_SELECTED_ITEMS());
      store.dispatch(ADD_SELECTED_ITEM(itemObject));
      element.classList.add(styles.itemBlockGridViewActive);
    }
}
export function removePermanently(){
    const selectedItems = store.getState().selectedItems;
    const directoryItems = store.getState().directoryItems;
    const API_URL                       = store.getState().config.API_URL;
    const API_URL_RemoveItemPermanently = store.getState().config.API_URL_RemoveItemPermanently;
    const rfmTokenName                  = store.getState().config.tokenName;
    let items=[];
    let removedItems=[];
    
    for(let i=0; i<selectedItems.length;i++){
        items.push(selectedItems[i].name);
        removedItems.push(selectedItems[i].name);
    }
    if(items.length > 0)
    {
      axios.post(API_URL + API_URL_RemoveItemPermanently,{
          "items":items,
          token:localStorage.getItem(rfmTokenName)
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
export function restoreItems(){
    let items          = [];
    let restoredItems  = [];
    
    const API_URL              = store.getState().config.API_URL;
    const API_URL_RestoreItems = store.getState().config.API_URL_RestoreItems;
    const selectedItems  = store.getState().selectedItems;
    const directoryItems = store.getState().directoryItems;
    const rfmTokenName                  = store.getState().config.tokenName;
    
    for(let i=0; i<selectedItems.length;i++){
        items.push({
          absolutePath:selectedItems[i].absolutePath,
          restorePath:selectedItems[i].restorePath
        });
        restoredItems.push(selectedItems[i].name)
    }

    if(items.length > 0)
    {
      axios.post(API_URL + API_URL_RestoreItems,{
          items,
          token:localStorage.getItem(rfmTokenName)
      }).then((response)=>{
          if(response.data.statu === true) {
            var reduced = directoryItems.filter((element)=> !restoredItems.includes(element.name));
            store.dispatch(CLEAR_SELECTED_ITEMS());
            store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          }
          else
            toast.error(response.data.message);
      }).catch((err)=>{
        store.dispatch(SET_ERROR(true));
        store.dispatch(SET_LOADING(false)); 
      });
    }
} 