import React from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronRight } from 'react-icons/fa'
import {  useSelector, useStore } from 'react-redux';
import { SET_MODAL_DEPTH, SET_MODAL_LOADING, SET_MODAL_LOCATION } from '../redux/functions';
import { RFM_WindowType } from '../helper/global';
import styles from '../styles.module.css'
function ModalPlacemap() {
    const currentLocation   = useSelector(state => state.modalLocation) + '';
    const startLocation     = useSelector(state => state.startLocation) + '';
    var splittedPlacemaps   = currentLocation.split('/');
    const rfmWindow         = useSelector(state => state.rfmWindow);
    const parentName = (rfmWindow === RFM_WindowType.DRIVE)
                        ? "Drive"
                        :
                        rfmWindow === RFM_WindowType.MY_SHARED
                        ? "Paylaştıklarım"
                        :
                        rfmWindow === RFM_WindowType.SHARED_WITH_ME
                        ? "Benimle paylaşılanlar"
                        : ""
    
    const RFM_Store           = useStore();

    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1)
        var newLocation          = reducedLocationArray.join('/')
        var refreshRequest       = (currentLocation === newLocation) ? true : false;

        var startIndex           = startLocation.split('/').length -1
        var currentIndex         = Math.abs(startIndex - key)
        
        if(!refreshRequest) {
            RFM_Store.dispatch(SET_MODAL_LOADING(true));
            RFM_Store.dispatch(SET_MODAL_LOCATION(newLocation));
            RFM_Store.dispatch(SET_MODAL_DEPTH(currentIndex));
        }
    }

    return(
        <div className={styles.placemapArea}>
            {
                splittedPlacemaps.map((item, key) => {
                    if(key >= startLocation.split('/').length - 1)
                        if(key === startLocation.split('/').length - 1)
                            return <a key={key}><Button variant="link" className={styles.placemapButtons} onClick={()=>changeCurrentLocation(key)}> {parentName}</Button></a>
                        else 
                            return <a key={key}><FaChevronRight/><Button variant="link" className={styles.placemapButtons} onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                })
            }
        </div>
    )    
}
export default ModalPlacemap;