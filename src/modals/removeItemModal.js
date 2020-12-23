import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'

function RemoveItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const selectedItems     = useSelector(state => state.selectedItems);
    const item = "deneme";
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    return (
      <div>
        {
          isContextMenuButton 
            ?
              <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                <div style={{fontSize:'14px'}}>Sil</div>
              </Button>
            :
              <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                <div className={styles.actionbarIcon}><FaTimesCircle color="#e04f5f"/></div>
                <div className={styles.actionbarText}>Sil</div>
              </Button>
        }
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Uyarı
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
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button onClick={()=>setModalShow(false)} variant="danger">Sil</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
export default RemoveItemModal;
  