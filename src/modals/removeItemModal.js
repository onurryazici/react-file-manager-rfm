import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FaArrowAltCircleRight, FaTimesCircle } from 'react-icons/fa';
import styles from '../styles.module.css'

function RemoveItemModal(){
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <div>
        <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                  <div className={styles.actionbarIcon}><FaTimesCircle color="#e04f5f"/></div>
                  <div className={styles.actionbarText}>Sil</div>
        </Button>
  
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Yeni Klasör
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          <Form>
            <Form.Group controlId="formFolderName">
              <Form.Control type="text" placeholder="Adsız Klasör" autoComplete="false"  />
            </Form.Group>
          </Form>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Close</Button>
          <Button onClick={()=>setModalShow(false)} variant="warning">Oluştur</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
export default RemoveItemModal;
  