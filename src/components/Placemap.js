import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import styles from '../styles.module.css'
export default class Placemap extends Component {
    render(){
        return(
            <div className={styles.placemapArea}>
                <a><Button variant="light">2019</Button></a>
                <span> {">"} </span>
                <a><Button variant="light">Onur</Button></a>
                <span> {">"} </span>
                <a><Button variant="light">Fotoğraflar</Button></a>
            </div>
        )
        
    }
}