import React from 'react'
import {Button, Modal,Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchCaller } from '../helper/global';
import Axios from 'axios';
import { Messages } from '../helper/message';
import { Actions } from '../context/actions';
import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
function CreateFolderModal(props){
  const [DirectoryName, setDirectoryName] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;
  const dispatch            = useDispatch();
  const currentLocation     = useSelector(state => state.location);
  const encryptedLocation   = currentLocation !== undefined && currentLocation !== "" ? Buffer.from(currentLocation).toString('base64') : "";
  const directoryItems      = useSelector(state => state.directoryItems);


  function CreateFolder(event) {
    event.preventDefault();
    var exist = directoryItems.filter((element) => element.name===DirectoryName).length > 0 ? true : false;

    if(!exist){
      if(DirectoryName.trim(' ').length > 0){
        Axios.get("http://192.168.252.128:3030/api/createDirectory",{
          params:{
            location:encryptedLocation,
            dirname:Buffer.from(DirectoryName).toString('base64')
          }
        })
        .then((response)=>{
          if(response.data.message === Messages.DIRECTORY_CREATE_SUCCESS){
              DispatchCaller(dispatch,Actions.SET_LOADING,false);
              DispatchCaller(dispatch,Actions.ADD_DIRECTORY_ITEM,response.data.item);
              NotificationManager.success("Dizin oluşturuldu");
          }
          else
                NotificationManager.error(response.data.message);
        }).catch((err)=>{
        DispatchCaller(dispatch,Actions.SET_ERROR, true);
        DispatchCaller(dispatch,Actions.SET_LOADING, false);
        });
      }
    }
    else{
      NotificationManager.warning("Bu dizin zaten mevcut");
    }
  }
  return (
    <div className={styles.noselect}>
      {
        isContextMenuButton
          ?
            <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                  <div style={{fontSize:'14px'}}>Yeni klasör</div>
            </Button>
          :
            <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                <div className={styles.actionbarIcon}><FaPlusCircle color="#28a745"/></div>
                <div className={styles.actionbarText}>Yeni klasör</div>
            </Button>
      }  

      <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
      <Form autoComplete="off" onSubmit={CreateFolder}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Yeni Klasör
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          <Form.Group role="form" controlId="formFolderName">
            <Form.Control type="text" 
                placeholder="Adsız Klasör" 
                name="folderName" 
                onChange={(e)=>setDirectoryName(e.target.value)}
                />
          </Form.Group>
       
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
        
        {
          DirectoryName!==""
          ? <Button as="input" type="submit" value="Oluştur" variant="success" />
          : <Button as="input" type="submit" value="Oluştur" variant="success" disabled/>
        }
      </Modal.Footer>
      </Form>
    </Modal>
    </div>
  );
}
export default CreateFolderModal;
