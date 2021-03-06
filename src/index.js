import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import RFM_Core from './core';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'
import { SET_RECYCLE_BIN, SET_RFM_CONFIG } from './context/functions';
import { store } from './context/store';

const RFM = (props) =>{
    const _location        = props.location;
    const _isItRecycleBin  = props.isItRecycleBin;
    const rfmConfigPayload = {
      API_URL                       : props.API_URL,
      API_URL_UserAuthentication    : props.API_URL_UserAuthentication,
      API_URL_RemoveItemPermanently : props.API_URL_RemoveItemPermanently,
      API_URL_CreateCopy            : props.API_URL_CreateCopy,
      API_URL_CreateDirectory       : props.API_URL_CreateDirectory,
      API_URL_EmptyTrash            : props.API_URL_EmptyTrash,
      API_URL_GetDirectory          : props.API_URL_GetDirectory,
      API_URL_GetImage              : props.API_URL_GetImage,
      API_URL_MoveItems             : props.API_URL_MoveItems,
      API_URL_MoveToTrash           : props.API_URL_MoveToTrash,
      API_URL_RemovePermission      : props.API_URL_RemovePermission,
      API_URL_RenameItem            : props.API_URL_RenameItem,
      API_URL_RestoreItems          : props.API_URL_RestoreItems,
      API_URL_ShareItem             : props.API_URL_ShareItem,
      API_URL_UploadItem            : props.API_URL_UploadItem,
      token                         : props.token,
    }

    store.dispatch(SET_RFM_CONFIG(rfmConfigPayload));
    store.dispatch(SET_RECYCLE_BIN(_isItRecycleBin));
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
  isItRecycleBin                : PropTypes.bool,
  API_URL                       : PropTypes.string,
  API_URL_UserAuthtentication   : PropTypes.string,
  API_URL_RemoveItemPermanently : PropTypes.string,
  API_URL_CreateCopy            : PropTypes.string,
  API_URL_CreateDirectory       : PropTypes.string,
  API_URL_EmptyTrash            : PropTypes.string,
  API_URL_GetDirectory          : PropTypes.string,
  API_URL_GetImage              : PropTypes.string,
  API_URL_MoveItems             : PropTypes.string,
  API_URL_MoveToTrash           : PropTypes.string,
  API_URL_RemovePermission      : PropTypes.string,
  API_URL_RenameItem            : PropTypes.string,
  API_URL_RestoreItems          : PropTypes.string,
  API_URL_ShareItem             : PropTypes.string,
  API_URL_UploadItem            : PropTypes.string,
  token                         : PropTypes.string,
}