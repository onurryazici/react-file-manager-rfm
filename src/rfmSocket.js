import  io  from "socket.io-client";
import { RFM_Store } from "./redux/rfmStore";
import { ADD_DIRECTORY_ITEM, CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, RENAME_ITEM } from './redux/functions'
import axios from "axios";
import { toast } from "material-react-toastify";
const URL    = "http://192.168.91.128:3030";
const RFM_Socket = io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} });

RFM_Socket.onAny((event, ...args) => {
  console.log(event, args);
});

RFM_Socket.on("SOMEONE_HAS_CREATED_FOLDER", (newFolderName)=>{
    const API_URL               = RFM_Store.getState().config.API_URL;
    const API_URL_GetDataSingle = RFM_Store.getState().config.API_URL_GetDataSingle;
    const currentLocation       = RFM_Store.getState().location
    const rfmTokenName          = RFM_Store.getState().config.tokenName;
    axios.post(API_URL + API_URL_GetDataSingle, {
      targetPath: currentLocation + "/" + newFolderName,
      token:localStorage.getItem(rfmTokenName)
    }).then((response)=>{
      console.log("-----------")
      console.log(response.data)
      if(response.data.statu){
        RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item));
        consoel.log(response.data.item)
      }
      else
        toast.error(response.data.message)
    }).catch((error)=>{
        toast.error(error);
    })
})

RFM_Socket.on("SOMEONE_HAS_DELETED_ITEMS", (deletedItems)=>{
  const directoryItems = RFM_Store.getState().directoryItems
  var reduced = directoryItems.filter((element)=> !deletedItems.includes(element.name));
  RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
  RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
})

RFM_Socket.on("SOMEONE_HAS_RENAMED_ITEM", (oldName,type,newName)=>{

  // REMOVE_SPECIFIC_ITEM
  // ADD_DIRECTORY_ITEM(datasingle)
  // CLEAR_SELECTED_ITEMS
  RFM_Store.dispatch(RENAME_ITEM(oldName, type, newName));
  RFM_Store.dispatch(CLEAR_SELECTED_ITEMS(null));
})
/*RFM_Socket.on("INCOMING_MESSAGE", (data)=>{
  const loggedUser       = RFM_Store.getState().loggedUser
  const selectedUser     = RFM_Store.getState().selectedUser
  const conversationList = RFM_Store.getState().conversationList
  if(data.sender === selectedUser) {
      RFM_Store.dispatch(PUSH_TO_SELECTED_CONVERSATION(data))
      RFM_Store.dispatch(SET_CONVERSATION_READ(selectedUser,true))
      let from     = loggedUser
      let target   = selectedUser
      RFM_Socket.emit("SET_READ", from, target)
      RFM_Store.dispatch(UPDATE_EXIST_CONVERSATION(target,true,true))
  } else {
      let isConversationExist = conversationList.some((element)=>element.user===data.sender)
      if (isConversationExist) {
        RFM_Store.dispatch(UPDATE_EXIST_CONVERSATION(data.sender,false,null))
        RFM_Store.dispatch(MOVE_CONVERSATION_TO_TOP(data.sender))
      }
      else
        RFM_Store.dispatch(ADD_NEW_CONVERSATION(data.sender,false,true))
  }
})

RFM_Socket.on("TYPING_NOTIFY", ({from, typing})=>{
  RFM_Store.dispatch(SET_CONVERSATION_IS_TYPING(from,typing))
})

RFM_Socket.on("ONLINE_NOTIFY", ({target,online})=>{
  const conversationList = RFM_Store.getState().conversationList
  let isConversationExist = conversationList.some((element)=>element.user===target)
  if(isConversationExist)
    RFM_Store.dispatch(UPDATE_EXIST_CONVERSATION(target,null,online))
})*/

export default RFM_Socket;
