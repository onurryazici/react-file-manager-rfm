import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../context/actions';
import { DispatchCaller } from '../helper/global';
import { Messages } from '../helper/message';
import styles from '../styles.module.css'

function RemoveItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch          = useDispatch();
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const selectedItems     = useSelector(state => state.selectedItems);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;

    function RemoveItem(){
      setModalShow(false);
        axios.get("http://192.168.252.128:3030/api/removeItem",{
          params:{
            "items[]":Buffer.from(selectedItems).toString('base64')
          }
        })
        .then((response)=>{
          if(response.data.message === Messages.ITEM_REMOVE_SUCCESS){
              DispatchCaller(dispatch,Actions.SET_LOADING,false);
              alert("silindi");
          }
          else if(response.data.message === Messages.DIRECTORY_ALREADY_EXISTS){
            setErrorMessage("Zaten var");
          }
          else if(response.data.message === Messages.SESSION_NOT_STARTED){
            /// redirect to login page
            alert("redirect to login");
          }
        }).catch((err)=>{
        DispatchCaller(dispatch,Actions.SET_ERROR, true);
        DispatchCaller(dispatch,Actions.SET_LOADING, false);
        });
      
    }
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
              selectedItemCount > 1 
                ? "Seçili " + selectedItemCount + " öğeyi silmek istediğinize emin misiniz?"
                : selectedItems[0] + " öğesi silinecektir onaylıyor musunuz?"
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button onClick={()=>RemoveItem()} variant="danger">Sil</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
export default RemoveItemModal;
  