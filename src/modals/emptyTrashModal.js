import axios from 'axios';
import { size } from 'lodash';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useStore } from 'react-redux';
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING } from '../context/functions';
import styles from '../styles.module.css'
function EmptyTrashModal(){
    const [modalShow, setModalShow] = React.useState(false);
    const store             = useStore();
    const directoryItems    = useSelector(state => state.directoryItems);
    const modalDisabled     = size(directoryItems) > 0 ? false : true;
    function EmptyTrash() {
      setModalShow(false);
      axios.get("http://192.168.252.128:3030/api/emptyTrash").then((response)=>{
            if(response.data.statu === true) {
              const cleared = [];
              store.dispatch(CLEAR_SELECTED_ITEMS());
              store.dispatch(SET_DIRECTORY_ITEMS(cleared));
            }
        }).catch(()=>{
          store.dispatch(SET_ERROR(true));
          store.dispatch(SET_LOADING(false));
        });
    }
    return (
      <React.Fragment>
              <Button variant="danger" onClick={() => setModalShow(true)} style={{float:'right'}} disabled={modalDisabled}>
                <div className={styles.actionbarText}>Çöp Kutusunu Boşalt</div>
              </Button>
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered className={styles.noselect}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Uyarı
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Çöp kutusundaki bütün öğeler silinecektir. Bu işlemin geri alınamayacağını unutmayınız.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button onClick={()=>EmptyTrash()} variant="danger">Tamamen Sil</Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    );
  }
export default EmptyTrashModal;