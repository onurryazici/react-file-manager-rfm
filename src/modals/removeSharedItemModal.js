import React from 'react'
import axios from 'axios'
import styles from '../styles.module.css'
import RFM_Socket from '../rfmSocket'
import { toast } from 'material-react-toastify'
import { Button, Modal } from 'react-bootstrap'
import { FaTimesCircle } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_LOADING } from '../redux/functions'
import { size } from 'lodash'
import { useMediaQuery } from 'react-responsive'


function RemoveSharedItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const RFM_Store           = useStore();
    const directoryItems      = useSelector(state => state.directoryItems);
    const selectedItems       = useSelector(state => state.selectedItems);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    const active              = props.active;
    const isDesktopOrLaptop   = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isBigScreen 		    = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const API_URL 			      = RFM_Store.getState().config.API_URL;
    const rfmTokenName        = RFM_Store.getState().config.tokenName;

    function RemoveItem() {
        setModalShow(false);
        const API_URL_RemoveSharedItem = RFM_Store.getState().config.API_URL_RemoveSharedItem;
        const currentRealPath          = RFM_Store.getState().realPath;
        let items        = [];
        let removedItems = [];
        
        for(let i=0; i<selectedItems.length;i++){
            items.push(selectedItems[i].absolutePath);
            removedItems.push(selectedItems[i].name);
        }
      
        if(items.length > 0)
        {
            axios.post(API_URL + API_URL_RemoveSharedItem,{
              "items":items,
              token:localStorage.getItem(rfmTokenName)
            }).then((response)=>{
                if(response.data.statu === true) {
                    var reduced = directoryItems.filter((element)=> !removedItems.includes(element.name));
                    RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
                    RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
                    const deletedItems = removedItems
                    const roomPath     = currentRealPath
                    RFM_Socket.emit("DELETE_ITEMS", deletedItems,roomPath)
                    toast.success('Silme işlemi başarılı');
                }
            }).catch((err)=>{
                toast.error("Bir hata oluştu : " + err)
                RFM_Store.dispatch(SET_LOADING(false));
            });
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
            {[
                <b>Bu işlemin ardından silinen öğeler geri alınamaz ve paylaşımda olan kullanıcılar erişemeyecektir.</b>,
                " Seçili " + size(selectedItems) + " öğeyi silmek istediğinize emin misiniz?"
            ]}
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
export default RemoveSharedItemModal;