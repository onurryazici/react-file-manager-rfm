import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FaAngleRight, FaArrowRight, FaCaretRight, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
function Placemap() {
    const currentLocation = useSelector(state => state.location);
    //const splittedPlacemaps = currentLocation.split('/');
    
    return(
        <div className={styles.placemapArea}>
            {
                /*splittedPlacemaps.map((item)=>{
                    if(item==="")
                        return <a><Button variant="link"> Drive</Button></a>
                    else 
                        return <a> <FaChevronRight/> <Button variant="link">{item}</Button></a>
                })*/
            }
            <div>s</div>
        </div>
    )    
}
export default Placemap;