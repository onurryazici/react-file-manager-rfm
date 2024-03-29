import React from 'react';
import  RFM  from 'react-file-manager-rfm';
import 'react-file-manager-rfm/dist/index.css';

const App = () =>{
  const testerr=(name)=>{
    alert("ok " + name);
  }
    return(
      <div>
        <RFM 
          location                      = "/home/user1/drive-sharedWithMe"
          rfmWindow                     = "SHARED_WITH_ME"
          username                      = "user1"
          API_URL                       = "http://localhost:3030"
          API_URL_UserAuthentication    = "/api/open-service/userAuthentication"
          API_URL_AddToDrive            = "/api/secured/addToDrive"
          API_URL_RemoveItemPermanently = "/api/secured/removeItemPermanently"
          API_URL_RemoveSharedItem      = "/api/secured/removeSharedItem"
          API_URL_CreateCopy            = "/api/secured/createCopy"
          API_URL_CreateDirectory       = "/api/secured/createDirectory"
          API_URL_Download              = "/api/secured/download"
          API_URL_EmptyTrash            = "/api/secured/emptyTrash"
          API_URL_GetDirectory          = "/api/secured/getDirectory"
          API_URL_GetDataSingle         = "/api/secured/getDataSingle"
          API_URL_GetImage              = "/api/secured/getImage"
          API_URL_MoveItems             = "/api/secured/moveItems"
          API_URL_MoveToTrash           = "/api/secured/moveToTrash"
          API_URL_MoveToDrive           = "/api/secured/moveToDrive"
          API_URL_RemovePermission      = "/api/secured/removePermission"
          API_URL_UpdatePermission      = "/api/secured/updatePermission"
          API_URL_RenameItem            = "/api/secured/renameItem"
          API_URL_RestoreItems          = "/api/secured/restoreItems"
          API_URL_NewShareItem          = "/api/secured/newShareItem"
          API_URL_ExistShareItem        = "/api/secured/existShareItem"
          API_URL_UploadItem            = "/api/secured/uploadItem"
          API_URL_IsUserExist           = "/api/secured/isUserExist"
          tokenName                     = "user-token"
          seri= {testerr}
        />
        </div>
    )
  }
export default App;