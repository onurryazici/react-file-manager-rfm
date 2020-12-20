import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FaArrowAltCircleRight, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'

function RemoveItemModal(){
    const [modalShow, setModalShow] = React.useState(false);
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const selectedItems     = useSelector(state => state.selectedItems);
    const item = "deneme";
    return (
      <div>
        <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                  <div className={styles.actionbarIcon}><FaTimesCircle color="#e04f5f"/></div>
                  <div className={styles.actionbarText}>Sil</div>
        </Button>
  
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {
              selectedItemCount > 0 
                ? "Seçili " + selectedItemCount + " öğeyi silmek istediğinize emin misiniz?"
                : item + " öğe silinecektir onaylıyor musunuz?"
            }
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
  