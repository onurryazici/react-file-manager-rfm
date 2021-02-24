import { ADD_SELECTED_ITEM, CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_LOCATION, SET_PREVIEW_ACTIVE, SET_PREVIEW_DATA } from '../context/functions';
import {store} from '../context/store'
import styles from '../styles.module.css'
import { HTTP_REQUEST } from './global';

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


export function onItemDoubleClick(accessibleId,itemType,itemName,absolutePath,extension){
    const isItRecycleBin = store.getState().isItRecycleBin;
    const currentLocation = store.getState().location;
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
export function restoreItems(){
    let encryptedItems=[];
    let restoredItems=[];
    const selectedItems = store.getState().selectedItems;
    const directoryItems = store.getState().directoryItems;
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
  } 