import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import {  FaGgCircle,  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
import ShareView from '../views/shareView';

function ShareItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const selectedItems             = useSelector((state) => state.selectedItems);
    const selectedItemCount         = useSelector((state) => state.selectedItemCount);
    const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;
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
        
        <Modal show={modalShow} onHide={()=>setModalShow(false) }  aria-labelledby="contained-modal-title-vcenter" centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Paylaş
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              (modalShow && selectedItems !== undefined && selectedItemCount === 1)
              ? <ShareView/>
              : ""
            }
            </Modal.Body>
          </Modal>
      </div>
    );
  }
export default ShareItemModal;