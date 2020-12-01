import React, { Component } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import fs from 'fs'
const Content = () => {
    const currentLocation = useSelector(state => state.location);
    const testFolder = 'C:/Users/onurr/Desktop/Staj';
    const fileNames = fs.readdirSync(testFolder);
    
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