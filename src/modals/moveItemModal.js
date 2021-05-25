import axios from 'axios'
import { toast } from 'material-react-toastify'
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaChevronCircleRight } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import Folder from '../components/folder'
import { CLEAR_SELECTED_ITEMS, INCREASE_MODAL_DEPTH, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_MODAL_DIRECTORY_ITEMS, SET_MODAL_LOADING, SET_MODAL_LOCATION } from '../redux/functions'
import { RFM_WindowType } from '../helper/global'
import styles from '../styles.module.css'
import ModalPlacemap from '../views/modalPlacemap'
function MoveItemModal(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const isContextMenuButton = props.isContextMenuButton === 'yes' ? true : false
  const active              = props.active;
  const RFM_Store           = useStore();
  const loading            = useSelector((state) => state.modalLoading)
  const currentLocation    = useSelector((state) => state.location)
  const modalLocation      = useSelector((state) => state.modalLocation)
  const mainDirectoryItems = useSelector((state) => state.directoryItems)
  const directoryItems     = useSelector((state) => state.modalDirectoryItems)
  const selectedItems      = useSelector((state) => state.selectedItems)
  const modalDepth         = useSelector((state) => state.modalDepth)
  const rfmWindow          = useSelector((state) => state.rfmWindow)
  const API_URL              = RFM_Store.getState().config.API_URL;
  const API_URL_GetDirectory = RFM_Store.getState().config.API_URL_GetDirectory;
  const API_URL_MoveItems    = RFM_Store.getState().config.API_URL_MoveItems;
  const rfmTokenName         = RFM_Store.getState().config.tokenName;

  const canMove = (rfmWindow === RFM_WindowType.MY_SHARED && (modalDepth > 0) && currentLocation !== modalLocation)  
    ? true 
    : 
    
    (rfmWindow === RFM_WindowType.SHARED_WITH_ME && modalDepth > 0 && currentLocation !== modalLocation)
    ? true
    :

    (rfmWindow === RFM_WindowType.DRIVE && currentLocation !== modalLocation)
    ? true
    : false
  

  const disabledStyle={
    pointerEvents:'none',
    opacity:'0.4'
  }

  useEffect(() => {
    if (modalLocation !== '' && modalShow) {
      axios.post(API_URL + API_URL_GetDirectory, {
         location: modalLocation,
         token:localStorage.getItem(rfmTokenName)
        }).then((response) => {
          RFM_Store.dispatch(SET_MODAL_LOADING(false));
          var reduced = response.data.items.filter((element)=> {
              return !selectedItems.some((selectedElement)=>{
                return selectedElement.absolutePath === element.absolutePath
            })
          });
          RFM_Store.dispatch(SET_MODAL_DIRECTORY_ITEMS(reduced));
        })
        .catch((err) => {
          alert(localStorage.getItem(rfmTokenName)+ err)
          RFM_Store.dispatch(SET_MODAL_LOADING(false));
          RFM_Store.dispatch(SET_ERROR(true));
        })
    } 
  }, [modalShow, modalLocation])

  function onItemDoubleClick(event, nameParam) {
    let newLocation = modalLocation + '/' + nameParam
    RFM_Store.dispatch(SET_MODAL_LOADING(true));
    RFM_Store.dispatch(SET_MODAL_LOCATION(newLocation));
    RFM_Store.dispatch(INCREASE_MODAL_DEPTH());

  }

  function MoveItems() {
    setModalShow(false)
    let items      = []
    let movedItems = []
    selectedItems.forEach((element) => {
      items.push(element.absolutePath)
      movedItems.push(element.name)
    })
    axios.post(API_URL + API_URL_MoveItems, {
          "items": items,
          target: modalLocation,
          token:localStorage.getItem(rfmTokenName)
      })
      .then((response) => {
        if (response.data.statu) {
          var reduced = mainDirectoryItems.filter((element)=> !movedItems.includes(element.name));
          RFM_Store.dispatch(CLEAR_SELECTED_ITEMS());
          RFM_Store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          toast.success('Taşıma işlemi gerçekleştirlidi')
        } else toast.error(response.data.message)
      })
      .catch((err) => {
        alert(err)
        RFM_Store.dispatch(SET_ERROR(true));
        RFM_Store.dispatch(SET_LOADING(false));
      })
  }
  return (
    <React.Fragment>
      {isContextMenuButton 
      ? (
        <Button variant='light' className={styles.contextMenuItem} onClick={() => setModalShow(true)} disabled={!active}>
          <div style={{ fontSize: '14px' }}>Taşı</div>
        </Button>
      ) : 
      (
        <Button variant='light' className={styles.actionbarButton} onClick={() => setModalShow(true)} disabled={!active}>
          <div className={styles.actionbarIcon}>
            <FaChevronCircleRight color='#4abc96' />
          </div>
          <div className={styles.actionbarText}>Taşı</div>
        </Button>
      )}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='s'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        className={styles.noselect}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Nereye taşımak istiyorsunuz?
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
                                <div key={key} className={styles.itemBlockListView} onDoubleClick={(event)=>onItemDoubleClick(event,item.name)}
                                  style={(item.write===false) ? disabledStyle : null}>
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
          <Button onClick={() => setModalShow(false)} variant='outline-dark'>
            Vazgeç
          </Button>
          <Button onClick={() => MoveItems()} variant='primary' disabled={!canMove}>
            Taşı
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
export default MoveItemModal
