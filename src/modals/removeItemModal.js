import axios from 'axios';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../context/actions';
import { DispatchCaller } from '../helper/global';
import styles from '../styles.module.css'
import { Messages } from '../helper/message';
import 'react-notifications/lib/notifications.css';
import { NotificationManager} from 'react-notifications';
function RemoveItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch          = useDispatch();
    const currentLocation   = useSelector(state => state.location);
    const directoryItems    = useSelector(state => state.directoryItems);
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const selectedItems     = useSelector(state => state.selectedItems);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;

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
        axios.get("http://192.168.252.128:3030/api/removeItem",{
          params:{
            "items":encryptedItems,
            location:Buffer.from(currentLocation).toString('base64')
          }
        }).then((response)=>{
            if(response.data.statu === true) {
              var reduced = directoryItems.filter((element)=> !removedItems.includes(element.name));
              DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS, null);
              DispatchCaller(dispatch,Actions.SET_DIRECTORY_ITEMS,reduced);
              NotificationManager.success('Silme işlemi başarılı');
            }
            else
              NotificationManager.error(response.data.message);
        }).catch(()=>{
            DispatchCaller(dispatch,Actions.SET_ERROR, true);
            DispatchCaller(dispatch,Actions.SET_LOADING, false);
        });
      }
      if(cantRemove.length > 0){
        NotificationManager.error(cantRemove, 'Silmek için yetkiniz yok');
      }
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
                : (selectedItems.length > 0) && (selectedItems[0].name) + " öğesi silinecektir onaylıyor musunuz?" 
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
  