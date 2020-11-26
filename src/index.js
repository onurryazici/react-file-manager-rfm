import React, { Component, useContext } from 'react'
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import Content from './components/content';
import Placemap from './components/placemap';
import FolderDetails from './components/folderDetails';
import Actionbar from './components/actionbar';
import test from './components/testCC'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';





const RFM = () => {
  const myCounter = useSelector(state => state.counter)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>{myCounter}</h2>
      <Button value="Increase" onClick={()=>dispatch({type:"INCREASE_COUNTER"})}/>
      <Button value="Decrease" onClick={()=>dispatch({type:"DECREASE_COUNTER"})}/>
      <test></test>
      <div className={styles.container}>
        <Actionbar/>
          <Placemap/>
          <Content/>
          <FolderDetails folderCount="10" fileCount="2"/>
        </div>
    </div>
  )
}
export default RFM;