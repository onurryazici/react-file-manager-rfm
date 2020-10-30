import React, { Component } from 'react'
import styles from '../styles.module.css'
export default class Placemap extends Component {
    render(){
        return(
            <div className={styles.placemapArea}>
                <a>2019</a>
                <span> {">"} </span>
                <a>Onur</a>
                <span> {">"} </span>
                <a>Fotoğraflar</a>
            </div>
        )
        
    }
}