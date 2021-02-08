import React from 'react'
import { Button } from 'react-bootstrap'
import { FaChevronRight, FaHistory, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { SET_LOADING, SET_LOCATION } from '../context/functions';
import styles from '../styles.module.css'
function Placemap() {
    const store           = useStore();
    var currentLocation   = useSelector(state => state.location) + '';
    var startLocation     = useSelector(state => state.startLocation) + '';
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const isItRecycleBin    = useSelector(state=>state.isItRecycleBin);
    var splittedPlacemaps = currentLocation.split('/');
    
    function changeCurrentLocation(key) {
        var reducedLocationArray = splittedPlacemaps.slice(0, key + 1);
        var newLocation          = reducedLocationArray.join('/');
        var refreshRequest       = (currentLocation === newLocation) ? true : false;
        if(!refreshRequest) {
            store.dispatch(SET_LOADING(true));
            store.dispatch(SET_LOCATION(newLocation));
        }
    }

    return(
        <div className={styles.placemapArea}>
            {
                ! isItRecycleBin ?
                splittedPlacemaps.map((item, key) => {
                    if(key >= startLocation.split('/').length -1)
                        if(key === startLocation.split('/').length -1)
                            return <a key={key}><Button variant="link" style={{color:'#000'}} onClick={()=>changeCurrentLocation(key)}> Home</Button></a>
                        else 
                            return <a key={key}><FaChevronRight/><Button variant="link" style={{color:'#000'}} onClick={()=>changeCurrentLocation(key)}>{item}</Button></a>
                })
                :(
                    <div>
                        <a><Button variant="link" style={{color:'#000'}}> Çöp Kutusu</Button></a>
                        <a><Button variant="danger" style={{float:'right'}}> Çöp Kutusunu Boşalt</Button></a>
                        {
                            selectedItemCount > 0 
                            ?([
                                <Button variant="light" className={styles.actionbarButton} style={{float:'right',fontSize:'18px'}}>
                                    <div className={styles.trashButtons}><FaTrash color="#555555"/></div>
                                </Button>,
                                <Button variant="light" className={styles.actionbarButton} style={{float:'right',fontSize:'18px'}}>
                                    <div className={styles.trashButtons}><FaHistory color="#555555"/></div>
                                </Button>
                            ]):""
                        }
                        
                    </div>

                )
            }
        </div>
    )    
}
export default Placemap;