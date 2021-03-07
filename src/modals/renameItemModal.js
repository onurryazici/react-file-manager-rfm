import React, { useState } from 'react'
import { Button, Modal, Form, Alert, InputGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles.module.css'
import { FaPenSquare } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { Messages } from '../helper/message'
import axios from 'axios'
import { toast } from 'material-react-toastify'
import { CLEAR_SELECTED_ITEMS, RENAME_ITEM, SET_ERROR, SET_LOADING } from '../context/functions'

function RenameItemModal(props) {
  const [modalShow, setModalShow]       = React.useState(false);
  const isContextMenuButton             = props.isContextMenuButton === 'yes' ? true : false;
  const store                           = useStore();
  const [isAcceptable, setIsAcceptable] = useState(false);
  const [newItemName, setNewItemName]   = useState('');
  const directoryItems  = useSelector((state) => state.directoryItems);
  const currentLocation = useSelector((state) => state.location);
  const selectedItems   = useSelector((state) => state.selectedItems);
  const name      = selectedItems.length > 0 && selectedItems[0].name;
  const type      = selectedItems.length > 0 && selectedItems[0].type;
  const extension = selectedItems.length > 0 && selectedItems[0].extension;
  const API_URL            = store.getState().config.API_URL;
  const API_URL_RenameItem = store.getState().config.API_URL_RenameItem;

  function onKeyPress(event) {
    var value         = event.value
    var pattern       = ['/', '\\' ]
    var wrongPattern  = pattern.some((element) => value.includes(element))
    if (wrongPattern) setIsAcceptable(false)
    else {
      setNewItemName(value)
      setIsAcceptable(true)
    }
  }

  function RenameItem(event) {
    event.preventDefault()
    var exist = directoryItems.filter((element) => element.name === newItemName).length > 0
        ? true
        : false

    if (!exist) {
      if (newItemName.trim(' ').length > 0) {
        axios.post(API_URL + API_URL_RenameItem, {
              itemPath  : (currentLocation + '/' + selectedItems[0].name),
              newName   : newItemName,
              type      : selectedItems[0].type,
              extension : selectedItems[0].extension,
          })
          .then((response) => {
            if (response.data.message === Messages.ITEM_RENAME_SUCCESS) {
              var item = directoryItems.find((element) => element.name === selectedItems[0].name)
              if (item) {
                store.dispatch(RENAME_ITEM(item.name, item.type,response.data.newItemName));
                store.dispatch(CLEAR_SELECTED_ITEMS(null));
              }
              toast.success('Yeniden adlandırıldı');
            } 
            else
              toast.error(response.data.message)
          })
          .catch((err) => {
            alert(err)
            store.dispatch(SET_ERROR(true));
          store.dispatch(SET_LOADING(false));
          })
      }
    } else {
      toast.warning('Bu öğe zaten mevcut')
    }
  }
  return (
    <React.Fragment>
      {isContextMenuButton ? 
      (
        <Button variant='light' className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
          <div style={{ fontSize: '14px' }}>Yeniden adlandır</div>
        </Button>
      )
      :
      (
          <Button variant='light' className={styles.actionbarButton} onClick={() => setModalShow(true)}>
            <div className={styles.actionbarIcon}>
              <FaPenSquare color='#28a745' />
            </div>
            <div className={styles.actionbarText}>Yeniden adlandır</div>
          </Button>
      )}

      <Modal show={modalShow} onHide={() => setModalShow(false)} size='s' aria-labelledby='contained-modal-title-vcenter' centered className={styles.noselect}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Yeniden adlandır
          </Modal.Title>
        </Modal.Header>
        <form autoComplete='off' onSubmit={RenameItem}>
          <Modal.Body>
            
              <Form.Group role='form' controlId='formItemName'>
                <InputGroup>
                  <FormControl
                    type="text"
                    name='itemName' 
                    onChange={(e) => onKeyPress(e.target)} 
                    defaultValue={ ( type !== "directory") ? (name+"").substring(0,(name+"").lastIndexOf('.')) : name}
                    aria-label="itemName"
                    aria-describedby="basic-addon2"
                    onFocus={(e)=>e.target.select()}
                  />
                  {
                    extension !== "" 
                    ? <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">{"." + extension}</InputGroup.Text>
                      </InputGroup.Append>
                    : "" 
                  }
                </InputGroup>
                {newItemName.length > 0 && !isAcceptable 
                ? (
                  [<br />,
                  <Alert variant='danger'>
                    <p>
                      Şu karakterleri içermemelidir / \ 
                    </p>
                  </Alert>
                  ]
                  ) 
                : ('')
                }
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)} variant='outline-dark'>
              Vazgeç
            </Button>

            {
              isAcceptable ? 
              (
                <Button as='input' type='submit' value='Yeniden adlandır'  variant='success' />
              ) 
              : 
              (
                  <Button as='input' type='submit' value='Yeniden adlandır' variant='success' disabled />
              )
            }
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  )
}
export default RenameItemModal
