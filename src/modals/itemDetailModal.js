import React, { useState } from 'react'
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
function ItemDetailModal(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false; 
    const selectedItems = useSelector((state)   => state.selectedItems);

    const [name, setName]   = useState("");
    const [type, setType]   = useState("");
    const [owner, setOwner] = useState("");
    const [read, setRead]   = useState("");
    const [write, setWrite] = useState("");
    const [lastAccessTime, setLastAccessTime] = useState("");
    const [lastModifyTime, setLastModifyTime] = useState("");
    const [sharedUsers, setSharedUsers]       = useState("");

    function ItemDetail(){
        setModalShow(true)
        setName(selectedItems[0].name);
        setType(selectedItems[0].type);
        setOwner(selectedItems[0].owner);
        setRead(selectedItems[0].read);
        setWrite(selectedItems[0].write);
        setLastAccessTime(selectedItems[0].lastAccessTime);
        setLastModifyTime(selectedItems[0].lastModifyTime);
        setSharedUsers(selectedItems[0].sharedUsers);
    }

    return (
      <React.Fragment>
        {
          isContextMenuButton
            ?
              <Button variant="light" className={styles.contextMenuItem} onClick={() => ItemDetail()}>
                  <div style={{fontSize:'14px'}}>Ayrıntılar</div>
              </Button>
            :
              <Button variant="light" className={styles.actionbarButton} onClick={() => ItemDetail()}>
                <div className={styles.actionbarIcon}><FaInfoCircle color="#ff9933"/></div>
                <div className={styles.actionbarText}>Ayrıntılar</div>
              </Button>
        }
        
  
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" className={styles.noselect}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ayrıntılar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:'0px'}} >
          <p>
          <Form autoComplete="off">
            <Form.Group controlId="formFolderName">
            {
                 <Table responsive="sm">
                 <thead>
                   <tr>
                     <th colspan="2">{name}</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Tür</td>
                     <td>: {(type==="directory") ? "Klasör" : "Dosya"}</td>
                   </tr>
                   <tr>
                     <td>Sahibi</td>
                     <td>: {owner}</td>
                   </tr>
                   <tr>
                     <td>En son değiştirilme</td>
                     <td>: {lastModifyTime}</td>
                   </tr>
                   <tr>
                     <td>En son erişilme</td>
                     <td>: {lastAccessTime} </td>
                   </tr>
                   <tr>
                     <td>Okuma</td>
                     <td>: {read ? <FaCheckCircle color="#51CD54" /> : <FaTimesCircle color="#FF2907"/>}</td>
                   </tr>
                   <tr>
                     <td>Yazma</td>
                     <td>: {write ? <FaCheckCircle color="#51CD54" /> : <FaTimesCircle color="#FF2907"/>}</td>
                   </tr>
                 </tbody>
               </Table>
            }
            </Form.Group>
          </Form>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Kapat</Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    );
}
export default ItemDetailModal;