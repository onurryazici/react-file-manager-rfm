import React, { useEffect } from 'react'
import styles from './styles.module.css'
import Content from './components/content'
import Placemap from './components/placemap'
import FolderDetails from './components/folderDetails'
import Actionbar from './components/actionbar'
import { useDispatch } from 'react-redux'
import { Actions } from './context/actions'
import { DispatchCaller } from './helper/global'
import { Messages } from './helper/message'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'

function RFM_Core(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    Axios.post('http://192.168.252.128:3030/api/userAuthentication', {
      username: props.username,
      password: props.password
    })
      .then((response) => {
        if (response.data.message === Messages.LOGIN_SUCCESSFULL) {
          DispatchCaller(dispatch, Actions.SET_LOADING, false)
          DispatchCaller(dispatch, Actions.SET_LOCATION, props.location)
          DispatchCaller(dispatch, Actions.SET_START_LOCATION, props.location)
          DispatchCaller(dispatch, Actions.SET_DIRECTORY_ITEMS, response.data.items)
        }
      })
      .catch((err) => {
        DispatchCaller(dispatch, Actions.SET_ERROR, true)
        DispatchCaller(dispatch, Actions.SET_LOADING, false)
      })
  }, [])

  return (
    <div className={styles.container}>
      <Actionbar />
      <Placemap />
      <Content />
      <FolderDetails />
    </div>
  )
}
export default RFM_Core
