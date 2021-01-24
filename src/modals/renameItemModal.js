import React, { useState } from 'react'
import { Button, Modal, Form, Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '../styles.module.css'
import { FaPenSquare } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Messages } from '../helper/message'
import axios from 'axios'
import { DispatchCaller } from '../helper/global'
import { Actions } from '../context/actions'
import { NotificationManager } from 'react-notifications'

function RenameItemModal(props) {
  const [modalShow, setModalShow]       = React.useState(false);
  const isContextMenuButton             = props.isContextMenuButton === 'yes' ? true : false;
  const [isAcceptable, setIsAcceptable] = useState(false);
  const [newItemName, setNewItemName]   = useState('');
  const dispatch                        = useDispatch();
  const directoryItems  = useSelector((state) => state.directoryItems);
  const currentLocation = useSelector((state) => state.location);
  const selectedItems   = useSelector((state) => state.selectedItems);

  function onKeyPress(event) {
    var value         = event.value
    var pattern       = ['.', '/', '\\', ':', ';', '^', '>', '<', '|']
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
        axios
          .get('http://192.168.252.128:3030/api/renameItem', {
            params: {
              itemPath: Buffer.from(currentLocation + '/' + selectedItems[0].name).toString('base64'),
              newName : Buffer.from(newItemName).toString('base64')
            }
          })
          .then((response) => {
            if (response.data.message === Messages.ITEM_RENAME_SUCCESS) {
              var item = directoryItems.find((element) => element.name === selectedItems[0].name)
              if (item) {
                const data = {
                  oldName:item.name,
                  newName:newItemName,
                }
                DispatchCaller(dispatch,Actions.RENAME_ITEM,data)
              }
              NotificationManager.success('Yeniden adlandırıldı');
            } 
            else
              NotificationManager.error(response.data.message)
          })
          .catch((err) => {
            console.log("xxx " + err);
            DispatchCaller(dispatch, Actions.SET_ERROR, true)
            DispatchCaller(dispatch, Actions.SET_LOADING, false)
          })
      }
    } else {
      NotificationManager.warning('Bu öğe zaten mevcut')
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
            
              <Form.Group role='form' controlId='formFolderName'>
                <Form.Control type='text' placeholder='Adsız Klasör' name='folderName' onChange={(e) => onKeyPress(e.target)} />
                <br />
                {newItemName.length > 0 && !isAcceptable 
                ? (
                  <Alert variant='danger'>
                    <p>
                      Şu karakterleri içermemelidir . , / \ : ; ^ &gt; &lt; |
                    </p>
                  </Alert>
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
