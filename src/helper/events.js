import axios from 'axios';
import { size } from 'lodash';
import { toast } from 'material-react-toastify';
import { ADD_DIRECTORY_ITEM, ADD_DOWNLOAD_FILE, ADD_SELECTED_ITEM, ADD_UPLOAD_FILE, CLEAR_SELECTED_ITEMS, FAILURE_UPLOAD_FILE, INCREASE_DEPTH, INCREASE_MODAL_DEPTH, SET_CURRENT_DIR_CAN_WRITE, SET_DIRECTORY_ITEMS, SET_DOWNLOAD_PROGRESS, SET_ERROR, SET_LOADING, SET_LOCATION, SET_PREVIEW_ACTIVE, SET_PREVIEW_DATA, SET_UPLOAD_PROGRESS, SHOW_FILE_PROGRESS, SUCCESS_DOWNLOAD_FILE, SUCCESS_UPLOAD_FILE } from '../context/functions';
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
export function onItemDoubleClick(accessibleId,itemType,itemName,_absolutePath,extension,canWrite){
    const rfmWindow        = store.getState().rfmWindow;
    const currentLocation  = store.getState().location;
    const rfmTokenName     = store.getState().config.tokenName;
    const API_URL          = store.getState().config.API_URL;
    const API_URL_GetImage = store.getState().config.API_URL_GetImage;
    const token		   = localStorage.getItem(rfmTokenName);
    if(!(rfmWindow===RFM_WindowType.RECYCLE_BIN))
    {
      if(itemType==="directory"){
        store.dispatch(SET_LOADING(true));
        var newLocation = currentLocation + "/" + itemName;
        store.dispatch(SET_LOCATION(newLocation));
        store.dispatch(CLEAR_SELECTED_ITEMS());
        store.dispatch(INCREASE_DEPTH());
        store.dispatch(INCREASE_MODAL_DEPTH());
        //store.dispatch(SET_CURRENT_DIR_CAN_WRITE(canWrite))
        const element = document.getElementById(accessibleId);
        element.classList.add(styles.itemBlockGridViewActive);
      }
      else if (extension==="png" || extension === "jpg" || extension === "jpeg")
      {
        store.dispatch(SET_PREVIEW_ACTIVE(true))
        store.dispatch(SET_PREVIEW_DATA(`${API_URL + API_URL_GetImage}?absolutePath=${_absolutePath}&jwt=${token}`));
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
    const selectedItems                 = store.getState().selectedItems;
    const directoryItems                = store.getState().directoryItems;
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

export function UploadService(fileList) {
  const API_URL            = store.getState().config.API_URL;
  const API_URL_UploadItem = store.getState().config.API_URL_UploadItem;
  const rfmTokenName       = store.getState().config.tokenName;
  const currentLocation    = store.getState().location;
  const fileProgress       = store.getState().fileProgress;
  console.log("liste")
  console.log(fileList)
  Array.from(fileList).forEach(async (_file,_index) => {
      const fileId      = size(fileProgress) + _index + 1;
      const fileName    = _file.name;
      const formPayload = new FormData();
      const CancelToken = axios.CancelToken
      const source      = CancelToken.source()
      store.dispatch(SHOW_FILE_PROGRESS(true));
      store.dispatch(ADD_UPLOAD_FILE(fileId, fileName, source))
      formPayload.append('file', _file); 
      const config  = { 
          cancelToken: source.token,
          onUploadProgress: (ProgresEvent) => {
              const { loaded, total } = ProgresEvent;
              const percentage        = Math.floor((loaded / total) * 100 );
              store.dispatch(SET_UPLOAD_PROGRESS(fileId, percentage));
          }, headers : {
            'x-access-token':localStorage.getItem(rfmTokenName),
          }, params  : {
            targetLocation:currentLocation,
          }
      }
      try{
        await axios.post(API_URL + API_URL_UploadItem,formPayload, config)
          .then((response)=>{
              store.dispatch(ADD_DIRECTORY_ITEM(response.data.item));
              store.dispatch(SUCCESS_UPLOAD_FILE(fileId));    
          }).catch((error)=>{
          toast.error(error);
          store.dispatch(FAILURE_UPLOAD_FILE(fileId))
      })
    } catch(error) {
      if(axios.isCancel(error)){
        alert("iptal")
      }
    }
  });
}

export function DownloadItem(){
  const selectedItems      = store.getState().selectedItems;
  const API_URL            = store.getState().config.API_URL;
  const API_URL_Download   = store.getState().config.API_URL_Download;
  const rfmTokenName       = store.getState().config.tokenName;
  const fileProgress       = store.getState().fileProgress;
  let items                = [];
  
  for(let i=0; i < selectedItems.length; i++)
      items.push(selectedItems[i].absolutePath);

  if(items.length > 0)
  {
    let isDirectory = selectedItems.some((element)=>element.absolutePath===items[0] && element.type==="directory");
    var outputName = ((items.length > 1) || isDirectory) ? (
      toast.dark('Sıkıştırılıyor...'),
      `archive-${new Date().getTime()}.zip`
    ) : ( selectedItems[0].name )

    const fileId     = size(fileProgress) + 1;
    const fileName   = outputName;
    store.dispatch(SHOW_FILE_PROGRESS(true));
    store.dispatch(ADD_DOWNLOAD_FILE(fileId, fileName))
    const requestConfig = {
        responseType: 'blob',
        cancelToken: '',
        onDownloadProgress: (ProgressEvent) => {
          const {loaded, total} = ProgressEvent;
          const percentage      = Math.floor((loaded / total) * 100);
          store.dispatch(SET_DOWNLOAD_PROGRESS(fileId,percentage))
        },
        headers:{
          "x-access-token":localStorage.getItem(rfmTokenName)
        },
        params:{
          "items":items,
          output:outputName
        }
    }
    axios.get(API_URL + API_URL_Download, requestConfig).then((response) => {
        if(response.status === 200){
          const headerContentDisp = response.headers["content-disposition"];
          const filename          = headerContentDisp && headerContentDisp.split("filename=")[1].replace(/["']/g, "");
          const contentType       = response.headers["content-type"];
          const blob              = new Blob([response.data], { contentType });
          const href              = window.URL.createObjectURL(blob);
          const tempLink          = document.createElement("a");
          tempLink.setAttribute("href", href);
          tempLink.setAttribute("download", filename || (response && response.filename));
          tempLink.click();
          window.URL.revokeObjectURL(blob);
          store.dispatch(SUCCESS_DOWNLOAD_FILE(fileId));
          return response;
        }
      })
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

export function MoveToDrive(){

  const selectedItems       = store.getState().selectedItems;
  const rfmTokenName        = store.getState().config.tokenName;
  const directoryItems      = store.getState().directoryItems;
  const API_URL             = store.getState().config.API_URL;
  const API_URL_MoveToDrive = store.getState().config.API_URL_MoveToDrive;

  let items      = []
  let movedItems = []
  selectedItems.forEach((element) => {
      items.push(element.absolutePath)
      movedItems.push(element.name)
  })
  axios.post(API_URL + API_URL_MoveToDrive, {
      "items": items,
      token:localStorage.getItem(rfmTokenName)
  })
  .then((response) => {
      if (response.data.statu) {
          var reduced = directoryItems.filter((element)=> !movedItems.includes(element.name));
          store.dispatch(CLEAR_SELECTED_ITEMS());
          store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          toast.success('Paylaşım kaldırıldı.')
      } 
      else toast.error(response.data.message)
  })
  .catch((err) => {
      alert(err)
      store.dispatch(SET_ERROR(true));
      store.dispatch(SET_LOADING(false));
  })
}

/*const headerContentDisp = res.headers["Content-disposition"];
      const filename =
        headerContentDisp &&
        headerContentDisp.split("filename=")[1].replace(/["']/g, ""); // TODO improve parcing
      const contentType = res.headers["Content-type"];

      const blob = new Blob([res.data], { contentType });
      const href = window.URL.createObjectURL(blob);

      const el = document.createElement("a");
      el.setAttribute("href", href);
      el.setAttribute(
        "download",
        filename || (res.config && res.config.filename) || "someFile"
      );
      el.click();

      window.URL.revokeObjectURL(blob);
      return res;*/