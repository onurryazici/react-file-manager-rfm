import axios from 'axios';
import { size } from 'lodash';
import { toast } from 'material-react-toastify';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { useSelector, useStore } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_LOADING } from '../redux/functions';
import styles from '../styles.module.css'
function RemoveItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const RFM_Store           = useStore();
    const currentLocation     = useSelector(state => state.location);
    const directoryItems      = useSelector(state => state.directoryItems);
    const selectedItems       = useSelector(state => state.selectedItems);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    const active              = props.active;
    const API_URL 			  = RFM_Store.getState().config.API_URL;
    const API_URL_MoveToTrash = RFM_Store.getState().config.API_URL_MoveToTrash;
    const rfmTokenName        = RFM_Store.getState().config.tokenName;
	const isDesktopOrLaptop   = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isBigScreen 		  = useMediaQuery({ query: '(min-device-width: 1824px)' })
    function RemoveItem() {
      setModalShow(false);
      let items        = [];
      let removedItems = [];
      let cantRemove   = [] ;
      
      for(let i=0; i<selectedItems.length;i++){
        if(selectedItems[i].write===false)
          cantRemove.push(selectedItems[i].name);
        else{
          items.push(selectedItems[i].name);
          removedItems.push(selectedItems[i].name);
        }
      }
      
      if(items.length > 0)
      {
        axios.post(API_URL + API_URL_MoveToTrash,{
            "items":items,
            location:currentLocation,
            token:localStorage.getItem(rfmTokenName)
        }).then((response)=>{
            if(response.data.statu === true) {
              var reduced = directoryItems.filter((element)=> !removedItems.includes(element.name));
              RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
              RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
              toast.success('Silme işlemi başarılı');
            }
            else
              toast.error(response.data.message);
        }).catch((err)=>{
          toast.error("Bir hata oluştu : " + err)
          RFM_Store.dispatch(SET_LOADING(false));
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
              <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)} disabled={!active}>
                <div style={{fontSize:'14px'}}>Sil</div>
              </Button>
            :
              <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)} disabled={!active}>
                <div className={styles.actionbarIcon}><FaTimesCircle color="#e04f5f"/></div>
                {isDesktopOrLaptop || isBigScreen 
					? <div className={styles.actionbarText}>Sil</div>
					: ""
				}
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
              size(selectedItems) > 1 
                ? "Seçili " + size(selectedItems) + " öğeyi silmek istediğinize emin misiniz?"
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
  