import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import {  FaGgCircle } from 'react-icons/fa';
import styles from '../styles.module.css'

function ShareItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    return (
      <div>
        {
          isContextMenuButton
            ?
              <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                  <div style={{fontSize:'14px'}}>Paylaş</div>
              </Button>
            :
              <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                <div className={styles.actionbarIcon}><FaGgCircle color="#25b7d3"/></div>
                <div className={styles.actionbarText}>Paylaş</div>
              </Button>
        }
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Paylaş
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          <Form autoComplete="off">
            <Form.Group controlId="formFolderName">
            <Form.Label>Paylaşmak istediğiniz kullanıcının adını giriniz.</Form.Label>
              
              <Form.Control type="text" placeholder="Kullanıcı adı" autoComplete="false"  />
            </Form.Group>
          </Form>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button onClick={()=>setModalShow(false)} variant="info">Paylaş</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
export default ShareItemModal;