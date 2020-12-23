import React from 'react'
import {Button, Modal,Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchCaller } from '../helper/global';
import Axios from 'axios';
function CreateFolderModal(props){
  const [modalShow, setModalShow] = React.useState(false);
  const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
  const dispatch = useDispatch();
  const currentLocation = useSelector(state => state.currentLocation);
  
  function CreateFolder(folderName) {
   
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Yeni Klasör
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        <Form autoComplete="off">
          <Form.Group controlId="formFolderName">
            <Form.Control type="text" placeholder="Adsız Klasör" />
          </Form.Group>
        </Form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
        <Button onClick={()=>setModalShow(false)} variant="warning">Oluştur</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
export default CreateFolderModal;