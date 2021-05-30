import React from 'react'
import { Button, Modal,Form, InputGroup } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { useState } from 'react'
import {  toast } from 'material-react-toastify'
import { ADD_DIRECTORY_ITEM, CLEAR_SELECTED_ITEMS, SET_DEPTH, SET_ERROR, SET_LOADING, SET_LOCATION } from '../redux/functions'
import Axios from 'axios';
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import { RFM_Store } from '../redux/rfmStore'
import RFM_Socket from '../rfmSocket'

function CreateFolderModal(props){
  const [DirectoryName, setDirectoryName]   = useState("")
  const [errorMessage, setErrorMessage]     = useState("")
  const [modalShow, setModalShow]           = useState(false)
  const [isAcceptable, setIsAcceptable]     = useState(false)
  const isContextMenuButton      = props.isContextMenuButton === "yes" ? true : false
  const active                   = props.active
  const currentLocation          = useSelector(state => state.location)
  const currentRealPath          = useSelector(state => state.realPath);
  const directoryItems           = useSelector(state => state.directoryItems)
  const startLocation            = useSelector(state => state.startLocation)
  const API_URL                  = RFM_Store.getState().config.API_URL
  const API_URL_CreateDirectory  = RFM_Store.getState().config.API_URL_CreateDirectory
  const rfmTokenName             = RFM_Store.getState().config.tokenName

  function onKeyPress(event) {
    var pattern       = ['/', '\\' ]
    var value         = event.target.value
    var wrongPattern  = pattern.some((element) => value.includes(element))
    var exist         = directoryItems.some((item) => item.name === value && item.type==="directory")
    if (wrongPattern) {
      setIsAcceptable(false)
      setErrorMessage("Şu karakterleri içermemelidir / \\ ")
    }
    else if(exist){
      setIsAcceptable(false)
      setErrorMessage("Bu öğe zaten mevcut")
    }
    else if(value.trim(' ').length === 0){
      setIsAcceptable(false)
      setErrorMessage("Geçerli bir isim belirtiniz")
    }
    else {
      setDirectoryName(value);
      setIsAcceptable(true);
      setErrorMessage("")
    }
  }

  function CreateFolder(event) {
    event.preventDefault();
    Axios.post(API_URL + API_URL_CreateDirectory ,{
        location:currentLocation,
        dirname:DirectoryName,
        token:localStorage.getItem(rfmTokenName)
    }).then((response)=>{
      if(response.data.statu === true) {
          RFM_Store.dispatch(SET_LOADING(false))
          RFM_Store.dispatch(ADD_DIRECTORY_ITEM(response.data.item))
          toast.success("Dizin oluşturuldu")
          const newFolder=DirectoryName
          const roomPath = currentRealPath
          RFM_Socket.emit("CREATE_FOLDER",newFolder,roomPath)
          setModalShow(false)
      }
      else
        toast.error("Bir hata ile karşılaştık : " + response.data.message)
      
    }).catch((error)=>{
      toast.error("Bu dizine erişim sağlanamamaktadır")
      RFM_Store.dispatch(SET_LOCATION(startLocation))
      RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
      RFM_Store.dispatch(SET_DEPTH(0))
    });
  }
  return (
    <React.Fragment>
      { isContextMenuButton
          ? <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)} disabled={!active}>
                  <div style={{fontSize:'14px'}}>Yeni klasör</div>
            </Button>
          : <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)} disabled={!active}>
                <div className={styles.actionbarIcon}><FaPlusCircle color="#28a745"/></div>
                <div className={styles.actionbarText}>Yeni klasör</div>
            </Button> }  
      <Modal show={modalShow} onHide={()=> { setModalShow(false); setDirectoryName("");} } size="s" aria-labelledby="contained-modal-title-vcenter" centered className={styles.noselect}>
      <Form noValidate validated={isAcceptable} autoComplete="off" onSubmit={CreateFolder}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Yeni Klasör</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup hasValidation>
            <Form.Control type="text" 
                placeholder="Adsız Klasör" 
                name="folderName" 
                onChange  = {(event)=>onKeyPress(event)}
                isInvalid = {!isAcceptable}
                isValid   = {isAcceptable}
                maxLength = {100}
                required
                />
            { ! isAcceptable
              ? <Form.Control.Feedback type="invalid" >{errorMessage}</Form.Control.Feedback>
              : "" }
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
        <Button as="input" type="submit" value="Oluştur" variant="success" disabled={!isAcceptable}/>
      </Modal.Footer>
      </Form>
    </Modal>
    </React.Fragment>
  );
}
export default CreateFolderModal;
