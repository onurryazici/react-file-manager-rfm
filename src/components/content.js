import React, { useState } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const fs = require('fs');
const Content = () => {
    const [Items, setItems] = useState(null);
    const currentLocation = useSelector(state => state.location);
    alert("Current Location" + currentLocation); 
    axios.get("http://localhost:3030/getDirectory",
    {
        params:{
            location:currentLocation,
            username:"onur"
        }
    }).then(response=>{
        console.log("RESP : " + response)
    })
    
    
    
    return (
        <div id={styles.contentStage} >
            <ContextMenuTrigger id="2">
                <div id={styles.contents} >
                {/*<RfmConsumer>
                    {
                        value => {
                            const {rfmItems} = value;
                            //alert("in Content.js : " + JSON.stringify(rfmItems));
                            return rfmItems.map(item => {
                                 return (
                                    <Item 
                                        key = {item.id}
                                        id = {item.id}
                                        itemName = {item.itemName}
                                        type={item.type} 
                                        extension={item.extension}                                  
                                    />
                                )
                            })
                        }
                    }
                    </RfmConsumer> */}   
                </div>
            </ContextMenuTrigger>
            <ContextMenu id="2">
                <div className={styles.contextMenuStage}>
                    <MenuItem className={styles.contextMenuItem} data={{ item: 'item 1' }}>
                        Yeni Klasör
                    </MenuItem>
                    <MenuItem className={styles.contextMenuItem} data={{ item: 'item 2' }}>
                        Dosya Yükle
                    </MenuItem>
                </div>
            </ContextMenu>
        </div>     
    )
}
export default Content;