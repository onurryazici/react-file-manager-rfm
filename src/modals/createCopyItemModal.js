import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FaStumbleuponCircle } from 'react-icons/fa';
import ModalPlacemap from '../components/modalPlacemap';
import styles from '../styles.module.css'

function CopyItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    return (
      <div className={styles.noselect}>
        {
          isContextMenuButton
            ?
              <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                  <div style={{fontSize:'14px'}}>Kopya oluştur</div>
              </Button>
            :
            <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                <div className={styles.actionbarIcon}><FaStumbleuponCircle color="#ab91ea"/></div>
                <div className={styles.actionbarText}>Kopya oluştur</div>
            </Button>
        } 
        
  
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Kopyasını oluştur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            modalShow ?
            [
              <ModalPlacemap/>,
              <ListView/>
            ]
            :""
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Close</Button>
          <Button onClick={()=>setModalShow(false)} variant="warning">Oluştur</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
export default CopyItemModal;