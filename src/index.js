import React from 'react'
import styles from './styles.module.css'
import Content from './components/content';
import Placemap from './components/placemap';
import FolderDetails from './components/folderDetails';
import Actionbar from './components/actionbar';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../example/src/context/actions';
import 'bootstrap/dist/css/bootstrap.css';

const RFM = (props) => {
  //const myCounter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  dispatch({type:Actions.SET_LOCATION, payload:props.location});
  return (
    <div className={styles.container}>
      <Actionbar/>
      <Placemap/>
      <Content/>
      <FolderDetails folderCount="10" fileCount="2"/>
    </div>
  )
}
export default RFM;