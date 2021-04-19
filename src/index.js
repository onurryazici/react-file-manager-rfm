import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import RFM_Core from './core';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import { SET_RFM_WINDOW, SET_RFM_CONFIG } from './context/functions';
import { store } from './context/store';

const RFM = (props) =>{
    const _location        = props.location;
    const _rfmWindow       = props.rfmWindow;
    const rfmConfigPayload = {
      API_URL                       : props.API_URL,
      API_URL_UserAuthentication    : props.API_URL_UserAuthentication,
      API_URL_RemoveItemPermanently : props.API_URL_RemoveItemPermanently,
      API_URL_RemoveSharedItem      : props.API_URL_RemoveSharedItem,
      API_URL_CreateCopy            : props.API_URL_CreateCopy,
      API_URL_CreateDirectory       : props.API_URL_CreateDirectory,
      API_URL_Download              : props.API_URL_Download,
      API_URL_EmptyTrash            : props.API_URL_EmptyTrash,
      API_URL_GetDirectory          : props.API_URL_GetDirectory,
      API_URL_GetImage              : props.API_URL_GetImage,
      API_URL_MoveItems             : props.API_URL_MoveItems,
      API_URL_MoveToTrash           : props.API_URL_MoveToTrash,
      API_URL_MoveToDrive           : props.API_URL_MoveToDrive,
      API_URL_RemovePermission      : props.API_URL_RemovePermission,
      API_URL_UpdatePermission      : props.API_URL_UpdatePermission,
      API_URL_RenameItem            : props.API_URL_RenameItem,
      API_URL_RestoreItems          : props.API_URL_RestoreItems,
      API_URL_NewShareItem          : props.API_URL_NewShareItem,
      API_URL_ExistShareItem        : props.API_URL_ExistShareItem,
      API_URL_UploadItem            : props.API_URL_UploadItem,
      API_URL_IsUserExist           : props.API_URL_IsUserExist,
      tokenName                     : props.tokenName,
      seri:props.seri
    }

    store.dispatch(SET_RFM_CONFIG(rfmConfigPayload));
    store.dispatch(SET_RFM_WINDOW(_rfmWindow));
    return(
      <Provider store={store}>
        <RFM_Core
          location={_location}
          username="main"
          password="qweqweasd"
        />
      </Provider>
    )
  }
export default RFM;


RFM.PropTypes = {
  location                      : PropTypes.string,
  rfmWindow                     : PropTypes.string,
  API_URL                       : PropTypes.string,
  API_URL_UserAuthtentication   : PropTypes.string,
  API_URL_RemoveItemPermanently : PropTypes.string,
  API_URL_RemoveSharedItem      : PropTypes.string,
  API_URL_CreateCopy            : PropTypes.string,
  API_URL_CreateDirectory       : PropTypes.string,
  API_URL_Download              : PropTypes.string,
  API_URL_EmptyTrash            : PropTypes.string,
  API_URL_GetDirectory          : PropTypes.string,
  API_URL_GetImage              : PropTypes.string,
  API_URL_MoveItems             : PropTypes.string,
  API_URL_MoveToTrash           : PropTypes.string,
  API_URL_MoveToDrive           : PropTypes.string,
  API_URL_RemovePermission      : PropTypes.string,
  API_URL_UpdatePermission      : PropTypes.string,
  API_URL_RenameItem            : PropTypes.string,
  API_URL_RestoreItems          : PropTypes.string,
  API_URL_NewShareItem          : PropTypes.string,
  API_URL_ExistShareItem        : PropTypes.string,
  API_URL_UploadItem            : PropTypes.string,
  API_URL_IsUserExist           : PropTypes.string,
  tokenName                     : PropTypes.string,
  seri : PropTypes.func
}