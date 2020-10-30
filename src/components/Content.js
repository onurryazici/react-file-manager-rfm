import React from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './Item'
import styles from '../styles.module.css'
export default function Content(data) {
    return (
        <div className={styles.contentsStage}>
        <ContextMenuTrigger id="2">
        <div className={styles.contents}>
            <Item itemName="20166666666666666666666666" id ="7" type="folder"/>
            <Item itemName="2016" id ="8" type="folder"/>
            <Item itemName="2016" id ="9" type="file"/>
            <Item itemName="2016666666666666666666666" id ="10" type="file"/>
            
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