import React from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../example/src/context/actions';
import styles from '../styles.module.css'
import { DispatchCaller } from '../helper/global';
function Placemap() {
    var currentLocation = useSelector(state => state.location) + '';
    //const username = useSelector(state => state.username);
    var splittedPlacemaps = currentLocation.split('/');
    const dispatch = useDispatch();
    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1);
        var newLocation = reducedLocationArray.join('/');
        var refreshRequest = (currentLocation === newLocation) ? true : false;
        // Refresh özelliği eklenmeyecek
        if(!refreshRequest){
            DispatchCaller(dispatch,Actions.SET_LOADING,true);
            DispatchCaller(dispatch,Actions.SET_LOCATION,newLocation);
        }
    }

    return(
        <div className={styles.placemapArea}>
            {
                // Key 0 = /
                // Key 1 = home/
                // Key 2 = username/
                // Key 3 = drive/
                // Parsed : / home / username / drive
                splittedPlacemaps.map((item, key) => {
                    if(key > 2){
                        if(key===3)
                            return <a key={key}><Button variant="link" onClick={()=>changeCurrentLocation(key)}> Drive</Button></a>
                        else 
                            return <a key={key}><FaChevronRight/><Button variant="link" onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                    }
                    else
                        <div key={key}></div>
                })
            }
        </div>
    )    
}
export default Placemap;