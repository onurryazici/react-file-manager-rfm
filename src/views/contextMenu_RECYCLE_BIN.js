import React from 'react'
import { Button } from 'react-bootstrap';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { removePermanently, restoreItems } from '../helper/events';
import styles from '../styles.module.css'
function RecycleBinContextMenu(props) {
    var itemName = props.itemName;
    return(
        <ContextMenu id={itemName} className={styles.contextMenuStage}>
                {[
                    <MenuItem>
                        <Button variant="light" className={styles.contextMenuItem} onClick={() => removePermanently()}>
                            <div style={{fontSize:'14px'}}>Tamamen Sil</div>
                        </Button>
                    </MenuItem>,
                    <MenuItem>
                        <Button variant="light" className={styles.contextMenuItem} onClick={() => restoreItems()}>
                            <div style={{fontSize:'14px'}}>Geri Yükle</div>
                        </Button>
                    </MenuItem>
                ]}
        </ContextMenu>
    )    
}
export default RecycleBinContextMenu;