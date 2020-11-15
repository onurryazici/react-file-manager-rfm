import React, { Component } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import RfmConsumer from '../../example/src/context'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class Content extends Component{
    render(){
        return (
            <div id={styles.contentStage} >
                <ContextMenuTrigger id="2">
                    <div id={styles.contents} >
                    <RfmConsumer>
                    {
                        value => {
                            const {rfmItems} = value;
                            alert(JSON.stringify(rfmItems));
                            
                            return rfmItems.map(item => {
                                 return (
                                    <Item 
                                        key = {item.id}
                                        id = {item.id}
                                        itemName = {item.itemName}
                                        type={item.type}                              
                                    />
                                )
                            })
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
export default Content;