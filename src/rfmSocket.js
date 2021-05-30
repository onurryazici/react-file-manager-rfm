import { RFM_Store } from "./redux/rfmStore"
import { ADD_DIRECTORY_ITEM, CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, RENAME_ITEM } from './redux/functions'
import { toast } from "material-react-toastify"
import axios from "axios"
import  io  from "socket.io-client"

const URL    = "http://192.168.91.131:3030"
const RFM_Socket = io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} })

RFM_Socket.onAny((event, ...args) => {
  console.log(event, args)
})

RFM_Socket.on("SOMEONE_HAS_CREATED_FOLDER", (newFolderName) => {
    const API_URL               = RFM_Store.getState().config.API_URL
    const API_URL_GetDataSingle = RFM_Store.getState().config.API_URL_GetDataSingle
    const currentLocation       = RFM_Store.getState().location
    const rfmTokenName          = RFM_Store.getState().config.tokenName
    axios.post(API_URL + API_URL_GetDataSingle, {
      targetPath: currentLocation + "/" + newFolderName,
      token:localStorage.getItem(rfmTokenName)
    }).then((response)=>{
      	if(response.data.statu)
        	RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item))
      	else
	        toast.error(response.data.message)
    }).catch((error)=>{
        toast.error(error)
    })
})

RFM_Socket.on("SOMEONE_HAS_DELETED_ITEMS", (deletedItems) => {
  	const directoryItems = RFM_Store.getState().directoryItems
  	var reduced = directoryItems.filter((element)=> !deletedItems.includes(element.name))
 	RFM_Store.dispatch(CLEAR_SELECTED_ITEMS())
 	RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced))
})

RFM_Socket.on("SOMEONE_HAS_RENAMED_ITEM", (oldName,newName) => {
  	const directoryItems        = RFM_Store.getState().directoryItems
  	const API_URL               = RFM_Store.getState().config.API_URL
  	const API_URL_GetDataSingle = RFM_Store.getState().config.API_URL_GetDataSingle
  	const currentLocation       = RFM_Store.getState().location
  	const rfmTokenName          = RFM_Store.getState().config.tokenName
  	var reduced = directoryItems.filter((element)=> element.name !== oldName)
  	RFM_Store.dispatch(CLEAR_SELECTED_ITEMS())
  	RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced))
  	axios.post(API_URL + API_URL_GetDataSingle, {
  	  	targetPath: currentLocation + "/" + newName,
  	  	token:localStorage.getItem(rfmTokenName)
  	}).then((response)=>{
  	  	if(response.data.statu)
  	    	RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item))
  	  	else
  	    	toast.error(response.data.message)
  	}).catch((error)=>{
      	toast.error(error)
  })
})

RFM_Socket.on("SOMEONE_HAS_UPLOADED_ITEM", (itemName) => {
  	const API_URL               = RFM_Store.getState().config.API_URL
  	const API_URL_GetDataSingle = RFM_Store.getState().config.API_URL_GetDataSingle
  	const currentLocation       = RFM_Store.getState().location
  	const rfmTokenName          = RFM_Store.getState().config.tokenName
  	axios.post(API_URL + API_URL_GetDataSingle, {
  	  	targetPath: currentLocation + "/" + itemName,
  	  	token:localStorage.getItem(rfmTokenName)
  	}).then((response)=>{
  	  	if(response.data.statu)
  	    	RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item))
  	  	else
  	    	toast.error(response.data.message)
  	}).catch((error)=>{
      	toast.error(error)
  	})
})

RFM_Socket.on("SOMEONE_HAS_MOVED_FROM_HERE", (itemName) => {
	const directoryItems = RFM_Store.getState().directoryItems
	var reduced = directoryItems.filter((element)=> element.name !== itemName);
    RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
    RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
})

RFM_Socket.on("SOMEONE_HAS_MOVED_TO_HERE", (itemName) => {
	const API_URL               = RFM_Store.getState().config.API_URL
    const API_URL_GetDataSingle = RFM_Store.getState().config.API_URL_GetDataSingle
    const currentLocation       = RFM_Store.getState().location
    const rfmTokenName          = RFM_Store.getState().config.tokenName
    axios.post(API_URL + API_URL_GetDataSingle, {
      targetPath: currentLocation + "/" + itemName,
      token:localStorage.getItem(rfmTokenName)
    }).then((response)=>{
      	if(response.data.statu)
        	RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item))
      	else
	        toast.error(response.data.message)
    }).catch((error)=>{
        toast.error(error)
    })
})
export default RFM_Socket
