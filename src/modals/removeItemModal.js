import axios from 'axios';
import { toast } from 'material-react-toastify';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useSelector, useStore } from 'react-redux';
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING } from '../context/functions';
import styles from '../styles.module.css'
function RemoveItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const store             = useStore();
    const currentLocation   = useSelector(state => state.location);
    const directoryItems    = useSelector(state => state.directoryItems);
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const selectedItems     = useSelector(state => state.selectedItems);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;

    const API_URL = store.getState().config.API_URL;
    const API_URL_MoveToTrash = store.getState().config.API_URL_MoveToTrash;
    
    function RemoveItem() {
      setModalShow(false);
      let encryptedItems=[];
      let removedItems=[];
      let cantRemove=[];
      
      for(let i=0; i<selectedItems.length;i++){
        if(selectedItems[i].write===false)
          cantRemove.push(selectedItems[i].name);
        else{
          encryptedItems.push(Buffer.from(selectedItems[i].name).toString('base64'));
          removedItems.push(selectedItems[i].name);
        }
      }
      
      if(encryptedItems.length > 0)
      {
        axios.get(API_URL + API_URL_MoveToTrash,{
          params:{
            "items":encryptedItems,
            location:Buffer.from(currentLocation).toString('base64')
          }
        }).then((response)=>{
            if(response.data.statu === true) {
              var reduced = directoryItems.filter((element)=> !removedItems.includes(element.name));
              store.dispatch(CLEAR_SELECTED_ITEMS());
              store.dispatch(SET_DIRECTORY_ITEMS(reduced));
              toast.success('Silme işlemi başarılı');
            }
            else
              toast.error(response.data.message);
        }).catch(()=>{
          store.dispatch(SET_ERROR(true));
          store.dispatch(SET_LOADING(false));
        });
      }
      if(cantRemove.length > 0){
        toast.error(cantRemove, 'Silmek için yetkiniz yok');
      }
    }
    return (
      <React.Fragment>
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
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered className={styles.noselect}>
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
                : (selectedItems.length > 0) && (selectedItems[0].name) + " öğesi silinecektir onaylıyor musunuz?" 
            }
          </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button onClick={()=>RemoveItem()} variant="danger">Sil</Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    );
  }
export default RemoveItemModal;
  