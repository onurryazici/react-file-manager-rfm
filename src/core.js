import React, { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import { SET_ERROR, SET_LOADING, SET_LOCATION, SET_RFM_WINDOW, SET_START_LOCATION } from './redux/functions'
import { ToastContainer } from 'material-react-toastify'
import styles from './styles.module.css'
import Content from './components/content'
import Placemap from './components/placemap'
import FolderDetails from './components/folderDetails'
import Actionbar from './components/actionbar'
import Axios from 'axios'
import Upload from './components/fileProgress'
import RFM_Socket from './rfmSocket'
import 'material-react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'

function RFM_Core(props) {
  	const RFM_Store = useStore();

  	/*const API_URL                     = useSelector(state => state.config.API_URL);
  	const API_URL_UserAuthentication  = useSelector(state => state.config.API_URL_UserAuthentication);
  	const loggedUser                  = useSelector(state => state.loggedUser);
  	const rfmTokenName                = RFM_Store.getState().config.tokenName;
  	useEffect(() => {
    	Axios.post(API_URL + API_URL_UserAuthentication , {
      		username: loggedUser,
      		password: "qweqweasd"
    	}).then((response) => {
      	  	if (response.data.statu) {
      	      	localStorage.setItem(rfmTokenName, response.data.token);
      	      	var location = prompt("konum","/home/user1/drive-shared")
      	      	var window = prompt("window","MY_SHARED")
      	      	RFM_Store.dispatch(SET_RFM_WINDOW(window))
      	      	RFM_Store.dispatch(SET_LOCATION(location));
      	      	RFM_Store.dispatch(SET_START_LOCATION(location));
      	      	RFM_Socket.auth = { loggedUser }
      	      	RFM_Socket.connect()
      	      	RFM_Socket.emit("USER_CONNECTED",loggedUser)
      	  	}
      	  	else{
      	    	console.log(JSON.stringify(response.data))
      	  	}
      	})
      	.catch((err) => {
			  alert(err)
      		RFM_Store.dispatch(SET_ERROR(true));
      	  	RFM_Store.dispatch(SET_LOADING(false));
      	})
  	}, []) /// FOR API TESTING */

  	useEffect(() => {
		RFM_Socket.auth = { loggedUser }
		RFM_Socket.connect()
		RFM_Socket.emit("USER_CONNECTED",loggedUser)
        RFM_Store.dispatch(SET_LOCATION(props.location));
        RFM_Store.dispatch(SET_START_LOCATION(props.location));
  }, [])

  return (
    <div className={styles.container}>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      <Actionbar />
      <Placemap />
      <Content />
      <FolderDetails />
      <Upload/>
      
    </div>
  )
}
export default RFM_Core
