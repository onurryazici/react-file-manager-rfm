import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { FaFolderOpen, FaStumbleuponCircle } from 'react-icons/fa';
import ModalPlacemap from '../views/modalPlacemap';
import styles from '../styles.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchCaller } from '../helper/global';
import { Actions } from '../context/actions';
import Folder from '../components/folder';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

function CopyItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;
    const dispatch          = useDispatch();
    const loading           = useSelector(state => state.modalLoading);
    const currentLocation   = useSelector(state => state.modalLocation);
    const directoryItems    = useSelector(state => state.modalDirectoryItems);
    const encryptedLocation = Buffer.from(currentLocation).toString('base64');
    const selectedItems     = useSelector(state => state.selectedItems);
    useEffect(() => {
        if(encryptedLocation !== "" && modalShow){
            axios.get("http://192.168.252.128:3030/api/getDirectory",{params:{location:encryptedLocation}})
              .then((response)=>{
                DispatchCaller(dispatch,Actions.SET_MODAL_LOADING,false);
                DispatchCaller(dispatch,Actions.SET_MODAL_DIRECTORY_ITEMS,response.data.items);
            }).catch((err)=>{
                DispatchCaller(dispatch,Actions.SET_MODAL_LOADING,false);
                DispatchCaller(dispatch,Actions.SET_ERROR,true);
            })
            console.log("running")
        }
        else{
          console.log(encryptedLocation + " ve " + modalShow);
        }
    },[modalShow,currentLocation]);
    
    function onItemDoubleClick (event,nameParam){
        let newLocation = currentLocation + "/" + nameParam;
        DispatchCaller(dispatch,Actions.SET_MODAL_LOADING,true);
        DispatchCaller(dispatch,Actions.SET_MODAL_LOCATION,newLocation);
    } 
    function CreateCopyItem(){
      setModalShow(false);
      
      axios.get("http://192.168.252.128:3030/api/createCopy",{
          params:{
            "items[]":encryptedLocation,
            target:encryptedLocation
          }
        })
        .then((response)=>{
          if(response.data.statu){
              NotificationManager.success("Kopyalama işlemi gerçekleştirlidi");
          }
          else
                NotificationManager.error(response.data.message);
        }).catch((err)=>{
        DispatchCaller(dispatch,Actions.SET_ERROR, true);
        DispatchCaller(dispatch,Actions.SET_LOADING, false);
        });

    }
    return (
      <React.Fragment>
        {
          (isContextMenuButton)
            ? <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                  <div style={{fontSize:'14px'}}>Kopya oluştur</div>
              </Button>
            : <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
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
                ? <div id={styles.loadingSpinner}>loading</div>
                : <div className={styles.containerW100PH300}>
                  {
                    directoryItems !== undefined && directoryItems.length > 0 
                      ? directoryItems.map((item)=>{
                          if(item.type==="directory")
                              return (
                                <div className={styles.itemBlockListView} onDoubleClick={(event)=>onItemDoubleClick(event,item.name)}>
                                    <Folder viewMode="list" folderName={item.name} folderType={item.type}/>
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
          <Button onClick={()=>CreateCopyItem()} variant="primary">Kopya Oluştur</Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    );
  }
export default CopyItemModal;