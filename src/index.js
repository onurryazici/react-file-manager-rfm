import React, { useEffect } from 'react'
import styles from './styles.module.css'
import Content from './components/content';
import Placemap from './components/placemap';
import FolderDetails from './components/folderDetails';
import Actionbar from './components/actionbar';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../example/src/context/actions';
import 'bootstrap/dist/css/bootstrap.css';

function RFM(props){
  const dispatch = useDispatch();

  function dispatchInvoker(typeValue, payloadValue) {
    return dispatch({type:typeValue, payload: payloadValue});
  }
  useEffect(() => {
    dispatchInvoker(Actions.SET_LOCATION, props.location);
    dispatchInvoker(Actions.SET_SHOW_HIDDEN_FILES, props.showHiddenFiles);
  }, []);
  
  return (
    <div className={styles.container}>
      <Actionbar/>
      <Placemap/>
      <Content/>
      <FolderDetails/>
    </div>
  )
}
export default RFM;

