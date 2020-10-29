import React from 'react'
import { Button } from 'react-bootstrap'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import Folder from './Folder';
import File from './File';
function Item(props){
    const itemId   = props.id;
    const itemName = props.itemName;
    const itemType = props.type;
    const isFolder = (itemType==="folder") ? true : false;
    
    return(
      <div>
        <ContextMenuTrigger id="1">
          <Button className="item-block btn btn-light shadow-none" onClick={()=>{alert(itemId)}}>
  
            {isFolder
                ? <Folder folderName={itemName}/>
                : <File fileName={itemName} />
              
            }
              
          </Button>
        </ContextMenuTrigger>
  
  
        <ContextMenu id="1">
          <div className="context-menu-stage">
            <MenuItem className="context-menu-item" data={{ item: 'item 1' }}>
              Paylaş
            </MenuItem>
            <MenuItem className="context-menu-item" data={{ item: 'item 2' }}>
              İndir
            </MenuItem>
            <MenuItem className="context-menu-item" data={{ item: 'item 3' }}>
              Şuraya Taşı
            </MenuItem>
            <MenuItem className="context-menu-item" data={{ item: 'item 4' }}>
              Yeniden Adlandır
            </MenuItem>
            <MenuItem className="context-menu-item" data={{ item: 'item 5' }}>
              Sil
            </MenuItem>
            <MenuItem className="context-menu-item" data={{ item: 'item 6' }}>
              Ayrıntılar
            </MenuItem>
          </div>
        </ContextMenu>
      </div>
    )
  }
  
  export default Item;