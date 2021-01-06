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

function CreateFolderModal(props){
  const [modalShow, setModalShow]       = React.useState(false);
  const isContextMenuButton             = props.isContextMenuButton === "yes" ? true : false;
  const [ErrorMessage, setErrorMessage] = useState("");

  const dispatch          = useDispatch();
  const currentLocation   = useSelector(state => state.location);
  const encryptedLocation = currentLocation !== undefined && currentLocation !== "" ? Buffer.from(currentLocation).toString('base64') : "";
  const [DirectoryName, setDirectoryName] = useState("");


  function CreateFolder(event) {
    event.preventDefault();
    if(DirectoryName !== "" && DirectoryName.trim(' ').length > 0){
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
        }
        else if(response.data.message === Messages.DIRECTORY_ALREADY_EXISTS){
          setErrorMessage("Zaten var");
        }
        else if(response.data.message === Messages.SESSION_NOT_STARTED){
          /// redirect to login page
          alert("redirect to login");
        }
      }).catch((err)=>{
      DispatchCaller(dispatch,Actions.SET_ERROR, true);
      DispatchCaller(dispatch,Actions.SET_LOADING, false);
      });
    }
  }

  return (
    <div>
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
      <form autoComplete="off" onSubmit={CreateFolder}>
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
                /><br/>
            {ErrorMessage!=="" ? ErrorMessage : ""}
          </Form.Group>
       
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
        <Button as="input" type="submit" value="Submit" variant="warning" />{' '}
      </Modal.Footer>
      </form>
    </Modal>
    </div>
  );
}
export default CreateFolderModal;
