import React from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './Item'

export default function Content(data) {
    return (
        <div className="contents-stage">
        <ContextMenuTrigger id="2">
        <div className="contents">
            <Item itemName="201sasdasdasdasss6" id="1" type="folder"/>
            <Item itemName="2016" id ="2" type="folder"/>
            <Item itemName="2016" id ="3" type="folder"/>
            <Item itemName="2016" id ="4" type="folder"/>
            <Item itemName="2016.pdf" id ="5" type="file"/>
            <Item itemName="2016" id ="6" type="folder"/>
            <Item itemName="2016" id ="7" type="folder"/>
            <Item itemName="2016" id ="8" type="folder"/>
            <Item itemName="2016" id ="9" type="file"/>
            <Item itemName="2016" id ="10" type="file"/>
            
        </div>
        </ContextMenuTrigger>
        <ContextMenu id="2">
        <div className="context-menu-stage">
            <MenuItem className="context-menu-item" data={{ item: 'item 1' }}>
                
                Yeni Klasör
            </MenuItem>
            <MenuItem className="context-menu-item" data={{ item: 'item 2' }}>
                Dosya Yükle
            </MenuItem>
            </div>
        </ContextMenu>
        </div>
    )
}
