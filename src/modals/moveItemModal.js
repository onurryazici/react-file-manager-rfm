import axios from 'axios'
import { toast } from 'material-react-toastify'
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaChevronCircleRight } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import Folder from '../components/folder'
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING, SET_MODAL_DIRECTORY_ITEMS, SET_MODAL_LOADING, SET_MODAL_LOCATION } from '../context/functions'
import styles from '../styles.module.css'
import ModalPlacemap from '../views/modalPlacemap'
function MoveItemModal(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const isContextMenuButton = props.isContextMenuButton === 'yes' ? true : false
  const store              = useStore();
  const loading            = useSelector((state) => state.modalLoading)
  const currentLocation    = useSelector((state) => state.modalLocation)
  const mainDirectoryItems = useSelector((state) => state.directoryItems)
  const directoryItems     = useSelector((state) => state.modalDirectoryItems)
  const selectedItems      = useSelector((state) => state.selectedItems)
  const encryptedLocation  = Buffer.from(currentLocation).toString('base64')

  const API_URL              = store.getState().config.API_URL;
  const API_URL_GetDirectory = store.getState().config.API_URL_GetDirectory;
  const API_URL_MoveItems    = store.getState().config.API_URL_MoveItems;

  useEffect(() => {
    if (encryptedLocation !== '' && modalShow) {
      axios.get(API_URL + API_URL_GetDirectory, {
          params: { location: encryptedLocation }
        }).then((response) => {
          store.dispatch(SET_MODAL_LOADING(false));
          var reduced = response.data.items.filter((element)=> {
              return !selectedItems.some((selectedElement)=>{
                return selectedElement.absolutePath === element.absolutePath
            })
          });
          store.dispatch(SET_MODAL_DIRECTORY_ITEMS(reduced));
        })
        .catch((err) => {
          alert(err)
          store.dispatch(SET_MODAL_LOADING(false));
          store.dispatch(SET_ERROR(true));
        })
    } 
  }, [modalShow, currentLocation])

  function onItemDoubleClick(event, nameParam) {
    let newLocation = currentLocation + '/' + nameParam
    store.dispatch(SET_MODAL_LOADING(true));
    store.dispatch(SET_MODAL_LOCATION(newLocation));
  }

  function MoveItems() {
    setModalShow(false)
    let encryptedItems = []
    let movedItems = []
    selectedItems.forEach((element) => {
      encryptedItems.push(Buffer.from(element.absolutePath).toString('base64'))
      movedItems.push(element.name)
    })
    axios.get(API_URL + API_URL_MoveItems, {
        params: {
          'items[]': encryptedItems,
          target: encryptedLocation
        }
      })
      .then((response) => {
        if (response.data.statu) {
          var reduced = mainDirectoryItems.filter((element)=> !movedItems.includes(element.name));
          store.dispatch(CLEAR_SELECTED_ITEMS());
          store.dispatch(SET_DIRECTORY_ITEMS(reduced));
          toast.success('Taşıma işlemi gerçekleştirlidi')
        } else toast.error(response.data.message)
      })
      .catch((err) => {
        alert(err)
        store.dispatch(SET_ERROR(true));
        store.dispatch(SET_LOADING(false));
      })
  }
  return (
    <React.Fragment>
      {isContextMenuButton 
      ? (
        <Button variant='light' className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
          <div style={{ fontSize: '14px' }}>Taşı</div>
        </Button>
      ) : 
      (
        <Button variant='light' className={styles.actionbarButton} onClick={() => setModalShow(true)}>
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
                                <div key={key} className={styles.itemBlockListView} onDoubleClick={(event)=>onItemDoubleClick(event,item.name)}>
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
          <Button onClick={() => MoveItems()} variant='primary'>
            Taşı
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
export default MoveItemModal
