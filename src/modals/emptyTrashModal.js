import axios from 'axios';
import { size } from 'lodash';
import { toast } from 'material-react-toastify';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useStore } from 'react-redux';
import { RedirectToStart } from '../helper/events';
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS } from '../redux/functions';
import { RFM_Store } from '../redux/rfmStore';
import styles from '../styles.module.css'
function EmptyTrashModal(){
    const [modalShow, setModalShow] = React.useState(false);
    const directoryItems    = useSelector(state => state.directoryItems);
    const modalDisabled     = size(directoryItems) > 0 ? false : true;

    const API_URL            = RFM_Store.getState().config.API_URL;
    const API_URL_EmptyTrash = RFM_Store.getState().config.API_URL_EmptyTrash;
    const rfmTokenName       = RFM_Store.getState().config.tokenName;

    function EmptyTrash() {
      setModalShow(false);
      axios.get(API_URL + API_URL_EmptyTrash,{params:{token:localStorage.getItem(rfmTokenName)}}).then((response)=>{
            if(response.data.statu === true) {
              const cleared = [];
              RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
              RFM_Store.dispatch(SET_DIRECTORY_ITEMS(cleared));
            }
        }).catch(()=>{
			toast.error("Silme işlemi başarısız")
			RedirectToStart()
        });
    }
    return (
      <React.Fragment>
              <Button variant="danger" onClick={() => setModalShow(true)} style={{float:'right',height:'45px'}} disabled={modalDisabled}>
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