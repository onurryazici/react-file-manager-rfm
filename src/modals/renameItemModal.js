import React, { useState } from 'react'
import { Button, Modal, Form, Alert, InputGroup, FormControl } from 'react-bootstrap'
import styles from '../styles.module.css'
import { FaPenSquare } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { Messages } from '../helper/message'
import axios from 'axios'
import { toast } from 'material-react-toastify'
import { CLEAR_SELECTED_ITEMS, RENAME_ITEM, SET_ERROR, SET_LOADING } from '../redux/functions'
import RFM_Socket from '../rfmSocket'
import { RFM_WindowType } from '../helper/global'
import 'bootstrap/dist/css/bootstrap.css'

function RenameItemModal(props) {
  const [modalShow, setModalShow]       = React.useState(false);
  const isContextMenuButton             = props.isContextMenuButton === 'yes' ? true : false;
  const active                          = props.active;
  const RFM_Store                       = useStore();
  const [isAcceptable, setIsAcceptable] = useState(false);
  const [newItemName, setNewItemName]   = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const directoryItems     = useSelector((state) => state.directoryItems);
  const currentLocation    = useSelector((state) => state.location);
  const selectedItems      = useSelector((state) => state.selectedItems);
  const currentRealPath    = useSelector((state) => state.realPath)
  const rfmWindow          = useSelector((state) => state.rfmWindow)
  const name               = selectedItems.length > 0 && selectedItems[0].name;
  const type               = selectedItems.length > 0 && selectedItems[0].type;
  const extension          = selectedItems.length > 0 && selectedItems[0].extension;
  const API_URL            = RFM_Store.getState().config.API_URL;
  const API_URL_RenameItem = RFM_Store.getState().config.API_URL_RenameItem;
  const rfmTokenName       = RFM_Store.getState().config.tokenName;


  function onKeyPress(event) {
    var value         = event.value
    var pattern       = ['/', '\\' ]
    var wrongPattern  = pattern.some((element) => value.includes(element))
    var exist         = directoryItems.some(item => {
      if(item.type==="directory")
        return item.name===value
      else
        return item.name===(value+"."+extension)
    });
    
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
      setNewItemName(value)
      setIsAcceptable(true)
      setErrorMessage("")
    }


  }

  function RenameItem(event) {
    event.preventDefault()
    axios.post(API_URL + API_URL_RenameItem, {
          itemPath  : (currentLocation + '/' + selectedItems[0].name),
          newName   : newItemName,
          type      : selectedItems[0].type,
          extension : selectedItems[0].extension,
          token     : localStorage.getItem(rfmTokenName)
    }).then((response) => {
        if (response.data.statu === true) {
          var item = directoryItems.find((element) => element.name === selectedItems[0].name)
          if (item) {
            RFM_Store.dispatch(RENAME_ITEM(item.name, item.type,response.data.newItemName));
            RFM_Store.dispatch(CLEAR_SELECTED_ITEMS(null));
            const oldName  = item.name 
            const newName  = response.data.newItemName
            const roomPath = currentRealPath
            if(rfmWindow !== RFM_WindowType.DRIVE)
              	RFM_Socket.emit("RENAME_ITEM", oldName, newName, roomPath)
          }
        } 
        else
          	toast.error(response.data.message)
     }).catch((err) => {
        toast.error("Bir hata oluştu " + err);
    })
  }


  return (
    <React.Fragment>
      {
        isContextMenuButton 
        ? 
        <Button variant='light' className={styles.contextMenuItem} onClick={() => setModalShow(true)} disabled={!active}>
          <div style={{ fontSize: '14px' }}>Yeniden adlandır</div>
        </Button>
        :
        <Button variant='light' className={styles.actionbarButton} onClick={() => setModalShow(true)} disabled={!active}>
          <div className={styles.actionbarIcon}><FaPenSquare color='#28a745' /></div>
          <div className={styles.actionbarText}>Yeniden adlandır</div>
        </Button>
      }

      <Modal show={modalShow} onHide={() => setModalShow(false)} size='s' aria-labelledby='contained-modal-title-vcenter' centered className={styles.noselect}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Yeniden adlandır</Modal.Title>
        </Modal.Header>
        <form autoComplete='off' onSubmit={RenameItem}>
          <Modal.Body>
              <Form.Group role='form' controlId='formItemName'>
                <InputGroup>
                  <FormControl
                    type             = "text"
                    name             = "itemName"
                    aria-label       = "itemName"
                    aria-describedby = "basic-addon2"
                    onChange         = {(e) => onKeyPress(e.target)} 
                    defaultValue     = {( type !== "directory") ? (name+"").substring(0,(name+"").lastIndexOf('.')) : name}
                    onFocus          = {(e)=>e.target.select()}
                    maxLength        = {100}
                  />
                  { extension !== "" 
                    ? <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">{"." + extension}</InputGroup.Text>
                      </InputGroup.Append>
                    : "" }
                </InputGroup>
                { errorMessage.length > 0 && !isAcceptable 
                  ? <Alert variant='danger'>{errorMessage}</Alert> 
                  : "" }
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)} variant='outline-dark'>Vazgeç</Button>
            <Button as='input' type='submit' value='Yeniden adlandır' variant='success' disabled={!isAcceptable}/>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  )
}
export default RenameItemModal
