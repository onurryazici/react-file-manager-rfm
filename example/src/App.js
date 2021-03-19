import React from 'react';
import  RFM  from 'react-file-manager-rfm';
import 'react-file-manager-rfm/dist/index.css';

const App = () =>{
    return(
        <RFM 
          location                      = "/home/main/drive/tester"
          isItRecycleBin                = {false}
          API_URL                       = "http://192.168.91.128:3030"
          API_URL_UserAuthentication    = "/api/open-service/userAuthentication"
          API_URL_RemoveItemPermanently = "/api/secured/removeItemPermanently"
          API_URL_CreateCopy            = "/api/secured/createCopy"
          API_URL_CreateDirectory       = "/api/secured/createDirectory"
          API_URL_EmptyTrash            = "/api/secured/emptyTrash"
          API_URL_GetDirectory          = "/api/secured/getDirectory"
          API_URL_GetImage              = "/api/secured/getImage"
          API_URL_MoveItems             = "/api/secured/moveItems"
          API_URL_MoveToTrash           = "/api/secured/moveToTrash"
          API_URL_RemovePermission      = "/api/secured/removePermission"
          API_URL_RenameItem            = "/api/secured/renameItem"
          API_URL_RestoreItems          = "/api/secured/restoreItems"
          API_URL_ShareItem             = "/api/secured/shareItem"
          API_URL_UploadItem            = "/api/secured/uploadItem"
          API_URL_IsUserExist           = "/api/secured/isUserExist"
          token                         = ""
        />
    )
  }
export default App;