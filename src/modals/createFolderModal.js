import React from 'react'
import {Button, Modal,Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector, useStore } from 'react-redux';
import Axios from 'axios';
import { Messages } from '../helper/message';
import { useState } from 'react';
import {  toast } from 'material-react-toastify';
import { ADD_DIRECTORY_ITEM, SET_ERROR, SET_LOADING } from '../context/functions';
function CreateFolderModal(props){
  const [DirectoryName, setDirectoryName] = useState("");
  const [modalShow, setModalShow]         = useState(false);
  const [isAcceptable, setIsAcceptable]   = useState(false);
  const [isAlreadyExist, setisAlreadyExist] = useState(false);
  const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
  const store               = useStore();
  const currentLocation     = useSelector(state => state.location);
  const directoryItems      = useSelector(state => state.directoryItems);

  const API_URL                   = store.getState().config.API_URL;
  const API_URL_CreateDirectory   = store.getState().config.API_URL_CreateDirectory;

  function onKeyPress(event) {
    var value         = event.target.value
    var pattern       = ['/', '\\' ]
    var wrongPattern  = pattern.some((element) => value.includes(element))
    var exist         = directoryItems.some((item) => item.name === value && item.type==="directory")

    if (wrongPattern) 
      setIsAcceptable(false)
    else if(exist)
      setisAlreadyExist(true);
    else {
      setDirectoryName(value);
      setIsAcceptable(true);
      setisAlreadyExist(false);
    }
  }


  function CreateFolder(event) {
    event.preventDefault();
    var exist = directoryItems.filter((element) => element.name === DirectoryName).length > 0 ? true : false;

    if(!exist){
      if(DirectoryName.trim(' ').length > 0){
        Axios.post(API_URL + API_URL_CreateDirectory ,{
            location:currentLocation,
            dirname:DirectoryName
        })
        .then((response)=>{
          if(response.data.statu === true){
              store.dispatch(SET_LOADING(false));
              store.dispatch(ADD_DIRECTORY_ITEM(response.data.item));
              toast.success("Dizin oluşturuldu")
              setModalShow(false);
          }
          else{
            
              toast.error(response.data.message);
          }
        }).catch((err)=>{
        store.dispatch(SET_ERROR(true));
        store.dispatch(SET_LOADING(false));
        });
      }
    }
    else{
      toast.warning("Bu dizin zaten mevcut");
    }
  }
  return (
    <React.Fragment>
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

      <Modal show={modalShow} onHide={()=> { setModalShow(false); setDirectoryName("");} } size="s" aria-labelledby="contained-modal-title-vcenter" centered className={styles.noselect}>
      <Form noValidate validated={isAcceptable} autoComplete="off" onSubmit={CreateFolder}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Yeni Klasör
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup hasValidation>
            <Form.Control type="text" 
                placeholder="Adsız Klasör" 
                name="folderName" 
                onChange={(event)=>onKeyPress(event)}
                required
                isInvalid = {!isAcceptable || isAlreadyExist}
                isValid = {isAcceptable && !isAlreadyExist}
                />
              {
                !isAcceptable && DirectoryName.length > 0
                ?
                <Form.Control.Feedback type="invalid" >
                Şu karakterleri içermemelidir / \
                </Form.Control.Feedback>
                : ""
              }
              {
                isAlreadyExist && DirectoryName.length > 0 
                ?
                <Form.Control.Feedback type="invalid" >
                  Bu klasör zaten mevcut 
                </Form.Control.Feedback>
                :""
                
              }
              

              
            
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
        
        {
          isAcceptable && !isAlreadyExist
          ? <Button as="input" type="submit" value="Oluştur" variant="success" />
          : <Button as="input" type="submit" value="Oluştur" variant="success" disabled/>
        }
      </Modal.Footer>
      </Form>
    </Modal>
    </React.Fragment>
  );
}
export default CreateFolderModal;
