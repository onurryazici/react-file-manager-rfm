import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import {  FaGgCircle,  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
import NewShareView from '../views/newShareView';

function NewShareItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const selectedItems             = useSelector((state) => state.selectedItems);
    const selectedItemCount         = useSelector((state) => state.selectedItemCount);
    const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;
    return (
      <React.Fragment>
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
        
        <Modal show={modalShow} onHide={()=>setModalShow(false) } aria-labelledby="contained-modal-title-vcenter" centered className={styles.noselect} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Paylaş
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              (selectedItems !== undefined && selectedItemCount === 1)
              ? <NewShareView/>
              : ""
            }
            </Modal.Body>
          </Modal>
      </React.Fragment>
    );
  }
export default NewShareItemModal;