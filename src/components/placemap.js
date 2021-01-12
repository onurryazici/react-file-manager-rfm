import React from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../context/actions';
import styles from '../styles.module.css'
import { DispatchCaller } from '../helper/global';
function Placemap() {
    const dispatch        = useDispatch();
    var currentLocation   = useSelector(state => state.location) + '';
    var startLocation     = useSelector(state => state.startLocation) + '';
    var splittedPlacemaps = currentLocation.split('/');
    
    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1);
        var newLocation          = reducedLocationArray.join('/');
        var refreshRequest       = (currentLocation === newLocation) ? true : false;
        if(!refreshRequest) {
            DispatchCaller(dispatch,Actions.SET_LOADING,true);
            DispatchCaller(dispatch,Actions.SET_LOCATION,newLocation);
        }
    }

    var count = splittedPlacemaps.length;

    return(
        <div className={styles.placemapArea}>
            {
                // Key 0 = /
                // Key 1 = home/
                // Key 2 = username/
                // Key 3 = drive/
                // Parsed : / home / username / drive
                splittedPlacemaps.map((item, key) => {
                    if(key > startLocation.split('/').length ){
                        if(key===startLocation.split('/').length + 1)
                            return <a key={key}><Button variant="link" style={{color:'#000'}} onClick={()=>changeCurrentLocation(key)}> Home</Button></a>
                        else 
                            return <a key={key}><FaChevronRight/><Button variant="link" style={{color:'#000'}} onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                    }
                        
                })

                
            }
            <div className="mb-2" style={{float:'right'}}>
            <DropdownButton menuAlign="right" title={"test"} id="dropdown-menu-align-right" variant="light" style={{background:'#fffff'}}>
                <Dropdown.Item eventKey="1">A-Z Baştan sona</Dropdown.Item>
                <Dropdown.Item eventKey="2">Z-A Sondan başa</Dropdown.Item>
            </DropdownButton>    
            </div>
        </div>
    )    
}
export default Placemap;