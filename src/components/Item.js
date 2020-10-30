import React from 'react'
import { Button } from 'react-bootstrap'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import Folder from './Folder';
import File from './File';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles.module.css'
function Item(props){
    const itemId   = props.id;
    const itemName = props.itemName;
    const itemType = props.type;
    const isFolder = (itemType==="folder") ? true : false;
    
    return(
      <div>
        <ContextMenuTrigger id="1">
          <Button variant="light" className={styles.itemBlock} onClick={()=>{alert(itemId)}}>
  
            {isFolder
                ? <Folder folderName={itemName}/>
                : <File fileName={itemName} />
              
            }
              
          </Button>
        </ContextMenuTrigger>
  
  
        <ContextMenu id="1">
          <div className={styles.contextMenuStage}>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 1' }}>
              Paylaş
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 2' }}>
              İndir
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 3' }}>
              Şuraya Taşı
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 4' }}>
              Yeniden Adlandır
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 5' }}>
              Sil
            </MenuItem>
            <MenuItem className={styles.contextMenuItem} data={{ item: 'item 6' }}>
              Ayrıntılar
            </MenuItem>
          </div>
        </ContextMenu>
      </div>
    )
  }
  
  export default Item;