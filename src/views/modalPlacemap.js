import React from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronRight } from 'react-icons/fa'
import {  useSelector, useStore } from 'react-redux';
import { SET_MODAL_LOADING, SET_MODAL_LOCATION } from '../context/functions';
import styles from '../styles.module.css'
function ModalPlacemap() {
    var currentLocation   = useSelector(state => state.modalLocation) + '';
    var startLocation     = useSelector(state => state.startLocation) + '';
    var splittedPlacemaps = currentLocation.split('/');
    const store           = useStore();
    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1);
        var newLocation          = reducedLocationArray.join('/');
        var refreshRequest       = (currentLocation === newLocation) ? true : false;
        if(!refreshRequest) {
            store.dispatch(SET_MODAL_LOADING(true));
            store.dispatch(SET_MODAL_LOCATION(newLocation));
        }
    }

    return(
        <div className={styles.placemapArea}>
            {
                splittedPlacemaps.map((item, key) => {
                    if(key >= startLocation.split('/').length - 1)
                        if(key === startLocation.split('/').length - 1)
                            return <a key={key}><Button variant="link" style={{color:'#000'}} onClick={()=>changeCurrentLocation(key)}> Home</Button></a>
                        else 
                            return <a key={key}><FaChevronRight/><Button variant="link" style={{color:'#000'}} onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                })
            }
        </div>
    )    
}
export default ModalPlacemap;