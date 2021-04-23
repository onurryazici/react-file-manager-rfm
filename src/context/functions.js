import { Actions } from "./actions"

export function SET_LOCATION(location){
    return dispatch => {
        dispatch({ type: Actions.SET_LOCATION, payload:location })
    }
}

export function SET_MODAL_LOCATION(location){
    return dispatch => {
        dispatch({ type: Actions.SET_MODAL_LOCATION,payload: location })
    }
}

export function SET_START_LOCATION(location){
    return dispatch => {
        dispatch({ type: Actions.SET_START_LOCATION,payload: location })
    }
}

export function ADD_DIRECTORY_ITEM(item){
    return dispatch => {
        dispatch({ type: Actions.ADD_DIRECTORY_ITEM, payload: item })
    }
}

export function SET_ERROR(hasError){
    return dispatch => {
        dispatch({ type: Actions.SET_ERROR, payload: hasError })
    }
}

export function SET_LOADING(isLoading){
    return dispatch => {
        dispatch({ type: Actions.SET_LOADING, payload:isLoading })
    }
}
export function SET_MODAL_LOADING(isLoading){
    return dispatch => {
        dispatch({ type: Actions.SET_MODAL_LOADING, payload:isLoading })
    }
}

export function CLEAR_SELECTED_ITEMS(){
    return dispatch => {
        dispatch({ type: Actions.CLEAR_SELECTED_ITEMS, payload:null })
    }
}

export function ADD_SELECTED_ITEM(_item){
    return dispatch => {
        dispatch({ type: Actions.ADD_SELECTED_ITEM, payload:_item})
    }
}
export function REMOVE_SELECTED_ITEM(item){
    return dispatch => {
        dispatch({ type: Actions.REMOVE_SELECTED_ITEM, payload:item })
    }
}
export function SET_DIRECTORY_ITEMS(items){
    return dispatch => {
        dispatch({ type: Actions.SET_DIRECTORY_ITEMS, payload:items })
    }
}
export function SET_MODAL_DIRECTORY_ITEMS(items){
    return dispatch => {
        dispatch({ type: Actions.SET_MODAL_DIRECTORY_ITEMS, payload:items })
    }
}

export function RENAME_ITEM(_oldName, _itemType, _newName){
    let payload = {oldName: _oldName, itemType:_itemType, newName: _newName}
    return dispatch => {
        dispatch({ type: Actions.RENAME_ITEM, payload: payload })
    }
}

export function ADD_SHARED_WITH(_itemName, _username, _read, _write, _execute){
    let payload = {itemName:_itemName, username:_username, read:_read, write :_write, execute:_execute}
    return dispatch => {
        dispatch({ type: Actions.ADD_SHARED_WITH, payload: payload })
    }
}

export function UPDATE_SHARED_WITH(_itemName, _username, _read, _write, _execute){
    let payload = {itemName:_itemName, username:_username, read:_read, write :_write, execute:_execute}
    return dispatch => {
        dispatch({ type: Actions.UPDATE_SHARED_WITH, payload: payload })
    }
}
export function CLEAR_SELECTED_SHARED_WITH(){
    return dispatch => {
        dispatch({ type: Actions.CLEAR_SELECTED_SHARED_WITH, payload: null })
    }
}
export function DELETE_SHARED_WITH(_itemName, _username){
    let payload = {itemName:_itemName, username:_username}
    return dispatch => {
        dispatch({ type: Actions.DELETE_SHARED_WITH, payload: payload })
    }
}

export function ADD_UPLOAD_FILE(_files){
    return dispatch => {
        dispatch({ type: Actions.ADD_UPLOAD_FILE, payload: _files })
    }
}

export function SET_UPLOAD_PROGRESS(_id, _progress){
    let payload = {id:_id, progress:_progress}
    return dispatch => {
        dispatch({ type: Actions.SET_UPLOAD_PROGRESS, payload: payload })
    }
}
export function SUCCESS_UPLOAD_FILE(_id, ){
    return dispatch => {
        dispatch({ type: Actions.SUCCESS_UPLOAD_FILE, payload: _id })
    }
}
export function FAILURE_UPLOAD_FILE(_id, ){
    return dispatch => {
        dispatch({ type: Actions.FAILURE_UPLOAD_FILE, payload: _id })
    }
}

export function SET_RFM_WINDOW(_window){
    return dispatch => {
        dispatch({ type: Actions.SET_RFM_WINDOW, payload: _window })
    }
}

export function SET_PREVIEW_ACTIVE(_isActive){
    return dispatch => {
        dispatch({ type: Actions.SET_PREVIEW_ACTIVE, payload: _isActive })
    }
}

export function SET_PREVIEW_DATA(_previewData){
    return dispatch => {
        dispatch({ type: Actions.SET_PREVIEW_DATA, payload: _previewData })
    }
}

export function SET_RFM_CONFIG(_configPayload){
    return dispatch => {
        dispatch({ type: Actions.SET_RFM_CONFIG, payload: _configPayload })
    }
}

export function INCREASE_DEPTH(){
    return dispatch => {
        dispatch({ type: Actions.INCREASE_DEPTH, payload: null })
    }
}
export function INCREASE_MODAL_DEPTH(){
    return dispatch => {
        dispatch({ type: Actions.INCREASE_MODAL_DEPTH, payload: null })
    }
}
export function SET_DEPTH(_depth){
    return dispatch => {
        dispatch({ type: Actions.SET_DEPTH, payload: _depth })
    }
}
export function SET_MODAL_DEPTH(_depth){
    return dispatch => {
        dispatch({ type: Actions.SET_MODAL_DEPTH, payload: _depth })
    }
}
export function SET_CURRENT_DIR_CAN_WRITE(_permission){
    return dispatch => {
        dispatch({ type: Actions.SET_CURRENT_DIR_CAN_WRITE, payload: _permission })
    }
}
