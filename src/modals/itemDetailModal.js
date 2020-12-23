import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import styles from '../styles.module.css'
function ItemDetailModal(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    return (
      <div>
        {
          isContextMenuButton
            ?
              <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                  <div style={{fontSize:'14px'}}>Ayrıntılar</div>
              </Button>
            :
              <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                <div className={styles.actionbarIcon}><FaInfoCircle color="#ff9933"/></div>
                <div className={styles.actionbarText}>Ayrıntılar</div>
              </Button>
        }
        
  
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ayrıntılar
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
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Kapat</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
}
export default ItemDetailModal;