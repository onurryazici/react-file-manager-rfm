import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaStumbleuponCircle } from 'react-icons/fa';
import ModalPlacemap from '../views/modalPlacemap';
import styles from '../styles.module.css'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Actions } from '../context/actions';
import Folder from '../components/folder';
import axios from 'axios';
import { toast } from 'material-react-toastify';
import { SET_ERROR, SET_LOADING, SET_MODAL_DIRECTORY_ITEMS, SET_MODAL_LOADING, SET_MODAL_LOCATION } from '../context/functions';

function CopyItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;
    const active                    = props.active;
    const store              = useStore();
    const loading            = useSelector(state => state.modalLoading);
    const currentLocation    = useSelector(state => state.modalLocation);
    const rfmCurrentLocation = useSelector(state => state.location);
    const directoryItems     = useSelector(state => state.modalDirectoryItems);
    const selectedItems      = useSelector(state => state.selectedItems);
    const API_URL            = store.getState().config.API_URL;
    const API_URL_GetDirectory = store.getState().config.API_URL_GetDirectory;
    const API_URL_CreateCopy   = store.getState().config.API_URL_CreateCopy;
    const rfmTokenName         = store.getState().config.tokenName;
    const rfmWindow = useSelector(state => state.rfmWindow)
    useEffect(() => {
        if(currentLocation !== "" && modalShow){
            axios.post(API_URL + API_URL_GetDirectory,{location:currentLocation,rfmWindow:rfmWindow,token:localStorage.getItem(rfmTokenName)})
              .then((response)=>{
                store.dispatch(SET_MODAL_LOADING(false));
                store.dispatch(SET_MODAL_DIRECTORY_ITEMS(response.data.items));
            }).catch((err)=>{
                store.dispatch(SET_MODAL_LOADING(false));
                store.dispatch(SET_ERROR(true));
            })
        }
    },[modalShow,currentLocation]);
    
    function onItemDoubleClick (event,nameParam){
        let newLocation = currentLocation + "/" + nameParam;
        store.dispatch(SET_MODAL_LOADING(true));
        store.dispatch(SET_MODAL_LOCATION(newLocation));
    } 
    function CreateCopyItem(){
      setModalShow(false);
      toast.dark("Kopyalama başlatılıyor...")
      let items=[];
      selectedItems.forEach(element => {
        items.push(element.absolutePath);
      });
      axios.post(API_URL + API_URL_CreateCopy,{
            "items":items,
            target:currentLocation,
            token:localStorage.getItem(rfmTokenName)
        })
        .then((response)=>{
          if(response.data.statu){
              toast.success("Kopyalama işlemi gerçekleştirlidi");
          }
          else
                toast.error(response.data.message);
        }).catch((err)=>{
          store.dispatch(SET_ERROR(true));
          store.dispatch(SET_LOADING(false));
        });

    }
    return (
      <React.Fragment>
        {
          (isContextMenuButton)
            ? <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)} disabled={!active}>
                  <div style={{fontSize:'14px'}}>Kopya oluştur</div>
              </Button>
            : <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)} disabled={!active}>
                <div className={styles.actionbarIcon}><FaStumbleuponCircle color="#ab91ea"/></div>
                <div className={styles.actionbarText}>Kopya oluştur</div>
            </Button>
        } 
        
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered  className={styles.noselect}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Nereye kopyalansın?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            [
                <ModalPlacemap/>,
                loading 
                ? <div className={styles.containerW100PH300}>
                    <div id={styles.detailLoadingSpinner} style={{fontSize:'8px',marginLeft:'auto',marginRight:'auto',marginTop:'120px'}}>
                      Loading...
                    </div>
                  </div>
                : <div className={styles.containerW100PH300}>
                  {
                    directoryItems !== undefined && directoryItems.length > 0 
                      ? directoryItems.map((item,key)=>{
                          if(item.type==="directory")
                              return (
                                <div key={key} className={styles.itemBlockListView} onDoubleClick={(event)=>onItemDoubleClick(event,item.name)}>
                                    <Folder viewMode="list" folderName={item.name} folderType={item.type} canWrite={item.write}/>
                                </div>   
                          )
                        })
                      : ""
                  }
                </div>
              ]
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button onClick={()=>CreateCopyItem()} variant="primary" disabled={currentLocation === rfmCurrentLocation}>Kopya Oluştur</Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    );
  }
export default CopyItemModal;