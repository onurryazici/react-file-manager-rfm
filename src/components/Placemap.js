import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { FaAngleRight, FaCaretRight } from 'react-icons/fa'
import styles from '../styles.module.css'
export default class Placemap extends Component {
    render(){
        return(
            <div className={styles.placemapArea}>
                <a><Button variant="light"><FaCaretRight/> 2019</Button></a>
                <a><Button variant="light"><FaCaretRight/> Onur</Button></a>
                <a><Button variant="light"><FaCaretRight/> Fotoğraflar</Button></a>
                
            </div>
        )
        
    }
}