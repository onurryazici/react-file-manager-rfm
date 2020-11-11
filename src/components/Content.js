import React, { Component } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import RfmConsumer from '../../example/src/context'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class Content extends Component {
    render() {
        return (
            <div className={styles.contentStage}>
                <ContextMenuTrigger id="2">
                    <div className={styles.contents}>
                    <RfmConsumer>
                    {
                        value => {
                            console.log(value)
                            const {rfmItems} = value;
                            return(
                                rfmItems.map(item => {
                                return (
                                    <Item 
                                        key = {item.id}
                                        id = {item.id}
                                        itemName = {item.itemName}
                                        type={item.type}                                    
                                    />
                                )
                                })
                            )
                        }
                    }
                    </RfmConsumer>    
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
}