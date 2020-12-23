import React, { useState} from 'react'
import {Button, Modal,Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
import { FaCircle, FaPen, FaPenSquare } from 'react-icons/fa';
function RenameItemModal(props){
  const [modalShow, setModalShow] = React.useState(false);
  const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;

  return (
    <div>
      {
          isContextMenuButton
          ?
            <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
              <div style={{fontSize:'14px'}}>Yeniden adlandır</div>
            </Button>
          :
            <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
              <div className={styles.actionbarIcon}><FaPenSquare color="#28a745"/></div>
              <div className={styles.actionbarText}>Yeniden adlandır</div>
            </Button>

      }


      <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Yeniden adlandır
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        <Form autoComplete="off">
          <Form.Group controlId="formFolderName">
            <Form.Control type="text" placeholder="..." autoComplete="false"  />
          </Form.Group>
        </Form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
        <Button onClick={()=>setModalShow(false)} variant="success">Yeniden adlandır</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
export default RenameItemModal;
