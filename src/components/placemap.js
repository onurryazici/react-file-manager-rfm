import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FaAngleRight, FaArrowRight, FaCaretRight, FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../example/src/context/actions';
import styles from '../styles.module.css'
function Placemap() {
    var currentLocation = useSelector(state => state.location) + '';
    //const username = useSelector(state => state.username);
    var splittedPlacemaps = currentLocation.split('/');
    //const home = "/home/" + username + "/" + userKey;
    const dispatch = useDispatch();
    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1);
        var newLocation = reducedLocationArray.join('/');
        dispatch({type:Actions.SET_LOCATION,payload: newLocation});
    }

    return(
        <div className={styles.placemapArea}>
            {
                splittedPlacemaps.map((item, key)=>{
                    if(item==="")
                        return <a key={key}><Button variant="link" onClick={()=>changeCurrentLocation(key)}> Drive</Button></a>
                    else 
                        return <a key={key}> <FaChevronRight/> <Button variant="link" onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                })
            }
            <div>s</div>
        </div>
    )    
}
export default Placemap;