import React from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronRight, FaHistory, FaTrash } from 'react-icons/fa'
import { useSelector, useStore } from 'react-redux'
import { SET_DEPTH, SET_LOADING, SET_LOCATION } from '../redux/functions'
import { RFM_WindowType } from '../helper/global'
import { size } from 'lodash'
import EmptyTrashModal from '../modals/emptyTrashModal'
import styles from '../styles.module.css'
function Placemap() {
    const RFM_Store       = useStore()
    const currentLocation = useSelector(state => state.location) + ''
    const startLocation   = useSelector(state => state.startLocation) + ''
    const selectedItems   = useSelector(state => state.selectedItems)
    const rfmWindow       = useSelector(state=>state.rfmWindow)
    var splittedPlacemaps = currentLocation.split('/')
    
    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1)
        var newLocation          = reducedLocationArray.join('/')
        var refreshRequest       = (currentLocation === newLocation) ? true : false
        var startIndex           = startLocation.split('/').length -1
        var currentIndex         = key - startIndex
        if(!refreshRequest) {
            RFM_Store.dispatch(SET_LOADING(true))
            RFM_Store.dispatch(SET_LOCATION(newLocation))
            RFM_Store.dispatch(SET_DEPTH(currentIndex))
        }
    }

    const ParentWindowName = () =>{
        switch (rfmWindow) {
            case RFM_WindowType.DRIVE:
                return "Drive"
            case RFM_WindowType.MY_SHARED:
                return "Paylaştıklarım"
            case RFM_WindowType.SHARED_WITH_ME:
                return "Benimle Paylaşılanlar"
            case RFM_WindowType.RECYCLE_BIN:
                return "Çöp Kutusu"
        }
    }
    return(
        <div className={styles.placemapArea}>
            {
                ! (rfmWindow === RFM_WindowType.RECYCLE_BIN) ?
                    splittedPlacemaps.map((item, key) => {
                        if(key >= startLocation.split('/').length -1){
                            if(key === startLocation.split('/').length -1)
                                return <a key={key}><Button variant="link" className={styles.placemapButtons} onClick={()=>changeCurrentLocation(key)}>{ParentWindowName()}</Button></a>
                            else 
                                return <a key={key}><FaChevronRight/><Button variant="link" className={styles.placemapButtons} onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                        }
                    })
                 
                :(
                    <div>
                        <a><Button variant="link" className={styles.placemapButtons}> Çöp Kutusu</Button></a>
                        <a><EmptyTrashModal/></a>
                        {
                            /*size(selectedItems) > 0 
                            ?([
                                <Button variant="light" className={styles.actionbarButton} style={{float:'right',fontSize:'18px'}}>
                                    <div className={styles.trashButtons}><FaTrash color="#555555"/></div>
                                </Button>,
                                <Button variant="light" className={styles.actionbarButton} style={{float:'right',fontSize:'18px'}}>
                                    <div className={styles.trashButtons}><FaHistory color="#555555"/></div>
                                </Button>
                            ]):""*/
                        }
                    </div>
                )
            }
        </div>
    )    
}
export default Placemap