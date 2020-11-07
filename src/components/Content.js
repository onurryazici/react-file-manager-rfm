import React from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import { FaFolderPlus } from 'react-icons/fa'

export default function Content(data) {
    return (
        <div className={styles.contentStage}>
            <ContextMenuTrigger id="2">
            <div className={styles.contents}>
                <Item itemName="20166666666666666666666666" id ="7" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016" id ="8" type="folder"/>
                <Item itemName="2016.pdf" id ="12" type="file"/>
                <Item itemName="2016.docx" id ="11" type="file"/>
                <Item itemName="2016.xlsx" id ="11" type="file"/>
                <Item itemName="2016.txt" id ="11" type="file"/>
                <Item itemName="2016" id ="9" type="file"/>

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
