import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaChevronCircleRight } from 'react-icons/fa'
import { NotificationManager } from 'react-notifications'
import { useDispatch, useSelector } from 'react-redux'
import Folder from '../components/folder'
import { Actions } from '../context/actions'
import { DispatchCaller } from '../helper/global'
import styles from '../styles.module.css'
import ModalPlacemap from '../views/modalPlacemap'
function MoveItemModal(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const isContextMenuButton = props.isContextMenuButton === 'yes' ? true : false
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.modalLoading)
  const currentLocation = useSelector((state) => state.modalLocation)
  const mainDirectoryItems = useSelector((state) => state.directoryItems)
  const directoryItems = useSelector((state) => state.modalDirectoryItems)
  const encryptedLocation = Buffer.from(currentLocation).toString('base64')
  const selectedItems = useSelector((state) => state.selectedItems)

  useEffect(() => {
    if (encryptedLocation !== '' && modalShow) {
      axios.get('http://192.168.252.128:3030/api/getDirectory', {
          params: { location: encryptedLocation }
        }).then((response) => {
          DispatchCaller(dispatch, Actions.SET_MODAL_LOADING, false)
          DispatchCaller(dispatch, Actions.SET_MODAL_DIRECTORY_ITEMS, response.data.items)
        })
        .catch((err) => {
          DispatchCaller(dispatch, Actions.SET_MODAL_LOADING, false)
          DispatchCaller(dispatch, Actions.SET_ERROR, true)
        })
    } 
  }, [modalShow, currentLocation])

  function onItemDoubleClick(event, nameParam) {
    let newLocation = currentLocation + '/' + nameParam
    DispatchCaller(dispatch, Actions.SET_MODAL_LOADING, true)
    DispatchCaller(dispatch, Actions.SET_MODAL_LOCATION, newLocation)
  }

  function MoveItems() {
    setModalShow(false)
    let encryptedItems = []
    let movedItems = []
    selectedItems.forEach((element) => {
      encryptedItems.push(Buffer.from(element.absolutePath).toString('base64'))
      movedItems.push(element.name)
    })
    axios.get('http://192.168.252.128:3030/api/moveItems', {
        params: {
          'items[]': encryptedItems,
          target: encryptedLocation
        }
      })
      .then((response) => {
        if (response.data.statu) {
          var reduced = mainDirectoryItems.filter((element)=> !movedItems.includes(element.name));
          console.log(reduced);
          DispatchCaller(dispatch,Actions.SET_DIRECTORY_ITEMS,reduced);
          DispatchCaller(dispatch,Actions.CLEAR_SELECTED_ITEMS, null);
          NotificationManager.success('Taşıma işlemi gerçekleştirlidi')
        } else NotificationManager.error(response.data.message)
      })
      .catch((err) => {
        DispatchCaller(dispatch, Actions.SET_ERROR, true)
        DispatchCaller(dispatch, Actions.SET_LOADING, false)
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
