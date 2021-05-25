import  io  from "socket.io-client";
import { RFM_Store } from "./redux/rfmStore";

const URL    = "http://192.168.91.128:3030";
const RFM_Socket = io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} });

RFM_Socket.onAny((event, ...args) => {
  console.log(event, args);
});

RFM_Socket.on("SOMEONE_HAS_CREATED_FOLDER", (newFolderName)=>{
  const API_URL  = RFM_Store.getState().config.API_URL;
  const API_URL_
  axios.post(API_URL + API_URL_UploadItem,formPayload, config)
          .then((response)=>{
              RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item));
              RFM_Store.dispatch(SUCCESS_UPLOAD_FILE(fileId));    
          }).catch((error)=>{
          toast.error(error);
          RFM_Store.dispatch(FAILURE_UPLOAD_FILE(fileId))
      })
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
