import axios from 'axios';
import { size } from 'lodash';
import { toast } from 'material-react-toastify';
import { ADD_DIRECTORY_ITEM, ADD_DOWNLOAD_FILE, ADD_SELECTED_ITEM, ADD_UPLOAD_FILE, CLEAR_SELECTED_ITEMS, FAILURE_UPLOAD_FILE, INCREASE_DEPTH, INCREASE_MODAL_DEPTH, SET_CURRENT_DIR_CAN_WRITE, SET_DIRECTORY_ITEMS, SET_DOWNLOAD_PROGRESS, SET_ERROR, SET_LOADING, SET_LOCATION, SET_PREVIEW_ACTIVE, SET_PREVIEW_DATA, SET_UPLOAD_PROGRESS, SHOW_FILE_PROGRESS, SUCCESS_DOWNLOAD_FILE, SUCCESS_UPLOAD_FILE } from '../redux/functions';
import { RFM_Store } from '../redux/rfmStore'
import styles from '../styles.module.css'
import { RFM_WindowType } from './global';
export function onItemSelected(event,accessibleId,itemName,itemObject){
    const selectedItems = RFM_Store.getState().selectedItems;
    var exist = selectedItems.some((element)=>{ return element.name === itemName});
    const element = document.getElementById(accessibleId);
      if(event.ctrlKey)
      {
        if(!exist){
          RFM_Store.dispatch(ADD_SELECTED_ITEM(itemObject))
        }
      }
      else 
      {
        RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
        RFM_Store.dispatch(ADD_SELECTED_ITEM(itemObject));
      }
    element.classList.add(styles.itemBlockGridViewActive);
} 
export function onItemDoubleClick(accessibleId,itemType,itemName,_absolutePath,extension,canWrite){
    const rfmWindow        = RFM_Store.getState().rfmWindow;
    const currentLocation  = RFM_Store.getState().location;
    const rfmTokenName     = RFM_Store.getState().config.tokenName;
    const API_URL          = RFM_Store.getState().config.API_URL;
    const API_URL_GetImage = RFM_Store.getState().config.API_URL_GetImage;
    const token		   = localStorage.getItem(rfmTokenName);
    if(!(rfmWindow===RFM_WindowType.RECYCLE_BIN))
    {
      if(itemType==="directory"){
        RFM_Store.dispatch(SET_LOADING(true));
        var newLocation = currentLocation + "/" + itemName;
        RFM_Store.dispatch(SET_LOCATION(newLocation));
        RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
        RFM_Store.dispatch(INCREASE_DEPTH());
        RFM_Store.dispatch(INCREASE_MODAL_DEPTH());
        //RFM_Store.dispatch(SET_CURRENT_DIR_CAN_WRITE(canWrite))
        const element = document.getElementById(accessibleId);
        element.classList.add(styles.itemBlockGridViewActive);
      }
      else if (extension==="png" || extension === "jpg" || extension === "jpeg")
      {
        RFM_Store.dispatch(SET_PREVIEW_ACTIVE(true))
        RFM_Store.dispatch(SET_PREVIEW_DATA(`${API_URL + API_URL_GetImage}?absolutePath=${_absolutePath}&jwt=${token}`));
         /*axios.post(API_URL + API_URL_GetImage,{
             absolutePath:_absolutePath
         }).then((response)=>{
           RFM_Store.dispatch(SET_PREVIEW_DATA(response.data))
         })*/
      }
    }
      
}
export function onItemContextMenu(accessibleId,itemName,itemObject){
    const selectedItems = RFM_Store.getState().selectedItems;
    var exist = selectedItems.some((element)=>{return element.name === itemName});
    const element = document.getElementById(accessibleId);
    if(!exist){
      RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
      RFM_Store.dispatch(ADD_SELECTED_ITEM(itemObject));
      element.classList.add(styles.itemBlockGridViewActive);
    }
}
export function removePermanently(){
    const selectedItems                 = RFM_Store.getState().selectedItems;
    const directoryItems                = RFM_Store.getState().directoryItems;
    const API_URL                       = RFM_Store.getState().config.API_URL;
    const API_URL_RemoveItemPermanently = RFM_Store.getState().config.API_URL_RemoveItemPermanently;
    const rfmTokenName                  = RFM_Store.getState().config.tokenName;
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
            RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
            RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          }
          else
            toast.error(response.data.message);
      }).catch((err)=>{
        alert(err)
        RFM_Store.dispatch(SET_ERROR(true));
        RFM_Store.dispatch(SET_LOADING(false)); 
      });
    }
}

export function UploadService(fileList) {
  const API_URL            = RFM_Store.getState().config.API_URL;
  const API_URL_UploadItem = RFM_Store.getState().config.API_URL_UploadItem;
  const rfmTokenName       = RFM_Store.getState().config.tokenName;
  const currentLocation    = RFM_Store.getState().location;
  const fileProgress       = RFM_Store.getState().fileProgress;
  console.log("liste")
  console.log(fileList)
  Array.from(fileList).forEach(async (_file,_index) => {
      const fileId      = size(fileProgress) + _index + 1;
      const fileName    = _file.name;
      const formPayload = new FormData();
      const CancelToken = axios.CancelToken
      const source      = CancelToken.source()
      RFM_Store.dispatch(SHOW_FILE_PROGRESS(true));
      RFM_Store.dispatch(ADD_UPLOAD_FILE(fileId, fileName, source))
      formPayload.append('file', _file); 
      const config  = { 
          cancelToken: source.token,
          onUploadProgress: (ProgresEvent) => {
              const { loaded, total } = ProgresEvent;
              const percentage        = Math.floor((loaded / total) * 100 );
              RFM_Store.dispatch(SET_UPLOAD_PROGRESS(fileId, percentage));
          }, headers : {
            'x-access-token':localStorage.getItem(rfmTokenName),
          }, params  : {
            targetLocation:currentLocation,
          }
      }
      try{
        await axios.post(API_URL + API_URL_UploadItem,formPayload, config)
          .then((response)=>{
              RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item));
              RFM_Store.dispatch(SUCCESS_UPLOAD_FILE(fileId));    
          }).catch((error)=>{
          toast.error(error);
          RFM_Store.dispatch(FAILURE_UPLOAD_FILE(fileId))
      })
    } catch(error) {
      if(axios.isCancel(error)){
        alert("iptal")
      }
    }
  });
}

export function DownloadItem(){
  const selectedItems      = RFM_Store.getState().selectedItems;
  const API_URL            = RFM_Store.getState().config.API_URL;
  const API_URL_Download   = RFM_Store.getState().config.API_URL_Download;
  const rfmTokenName       = RFM_Store.getState().config.tokenName;
  const fileProgress       = RFM_Store.getState().fileProgress;
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
    const CancelToken = axios.CancelToken
    const source      = CancelToken.source()
    RFM_Store.dispatch(SHOW_FILE_PROGRESS(true));
    RFM_Store.dispatch(ADD_DOWNLOAD_FILE(fileId, fileName, source))
    const requestConfig = {
        responseType: 'blob',
        cancelToken: source.token,
        onDownloadProgress: (ProgressEvent) => {
          const {loaded, total} = ProgressEvent;
          const percentage      = Math.floor((loaded / total) * 100);
          RFM_Store.dispatch(SET_DOWNLOAD_PROGRESS(fileId,percentage))
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
          RFM_Store.dispatch(SUCCESS_DOWNLOAD_FILE(fileId));
          return response;
        }
      })
  }
}


export function restoreItems(){
    let items          = [];
    let restoredItems  = [];
    
    const API_URL              = RFM_Store.getState().config.API_URL;
    const API_URL_RestoreItems = RFM_Store.getState().config.API_URL_RestoreItems;
    const selectedItems  = RFM_Store.getState().selectedItems;
    const directoryItems = RFM_Store.getState().directoryItems;
    const rfmTokenName                  = RFM_Store.getState().config.tokenName;
    
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
            RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
            RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          }
          else
            toast.error(response.data.message);
      }).catch((err)=>{
        RFM_Store.dispatch(SET_ERROR(true));
        RFM_Store.dispatch(SET_LOADING(false)); 
      });
    }
} 

export function MoveToDrive(){

  const selectedItems       = RFM_Store.getState().selectedItems;
  const rfmTokenName        = RFM_Store.getState().config.tokenName;
  const directoryItems      = RFM_Store.getState().directoryItems;
  const API_URL             = RFM_Store.getState().config.API_URL;
  const API_URL_MoveToDrive = RFM_Store.getState().config.API_URL_MoveToDrive;

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
          RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
          RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          toast.success('Paylaşım kaldırıldı.')
      } 
      else toast.error(response.data.message)
  })
  .catch((err) => {
      alert(err)
      RFM_Store.dispatch(SET_ERROR(true));
      RFM_Store.dispatch(SET_LOADING(false));
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