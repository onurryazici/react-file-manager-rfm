import React, { useEffect } from 'react'
import styles from './styles.module.css'
import Content from './components/content'
import Placemap from './components/placemap'
import FolderDetails from './components/folderDetails'
import Actionbar from './components/actionbar'
import { useDispatch, useStore } from 'react-redux'
import { Messages } from './helper/message'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from 'material-react-toastify'
import Upload from './components/Upload'
import { SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_LOCATION, SET_START_LOCATION } from './context/functions'

function RFM_Core(props) {
  const store = useStore();
  useEffect(() => {
    Axios.post('http://192.168.252.128:3030/api/userAuthentication', {
      username: props.username,
      password: props.password
    })
      .then((response) => {
        if (response.data.message === Messages.LOGIN_SUCCESSFULL) {
          store.dispatch(SET_LOADING(false));
          store.dispatch(SET_LOCATION(props.location));
          store.dispatch(SET_START_LOCATION(props.location));
          store.dispatch(SET_DIRECTORY_ITEMS(response.data.items));
        }
      })
      .catch((err) => {
        store.dispatch(SET_ERROR(true));
        store.dispatch(SET_LOADING(false));
        
        
      })
  }, [])

  return (
    <div className={styles.container}>
      <Actionbar />
      <Placemap />
      <Content />
      <FolderDetails />
      <Upload/>
      <ToastContainer
                    position="top-right"
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    />
    </div>
  )
}
export default RFM_Core
