import React, { useEffect, useState } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Actions } from '../../example/src/context/actions';
import { Button } from 'react-bootstrap';
function Content() {
    const [Loading, setLoading] = useState(true);
    const currentLocation       = useSelector(state => state.location);
    const directoryItems        = useSelector(state => state.directoryItems);
    const showHiddenFilesValue  = useSelector(state => state.showHiddenFiles);
    const dispatch              = useDispatch();
    const encryptedLocation     = Buffer.from(currentLocation).toString('base64');
    const username = "main";
    
    useEffect(() => {
        axios.get("http://192.168.1.159:3030/api/getDirectory",{
            params:{
                location:encryptedLocation,
                username:username,
                showHiddenFiles:showHiddenFilesValue
            }})
        .then((response)=>{
            setLoading(false);
            dispatch({type:Actions.SET_DIRECTORY_ITEMS,payload:response.data.items});
        })
    },
    [currentLocation]
    );
    if(Loading)
    {
        return (
            <div id={styles.contentStage}>
                <div id={styles.loadingItem}>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div id={styles.contentStage} >
                <ContextMenuTrigger id="2">
                    <div id={styles.contents} >
                        {directoryItems.length > 0 ? 
                            directoryItems.map((item)=>{
                                return (
                                    <Item 
                                        key = {item.name}
                                        name = {item.name}
                                        type={item.type} 
                                        extension={item.extension}/>
                                )
                            })
                            :""
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id="2">
                    <div className={styles.contextMenuStage}>
                        <MenuItem data={{ item: 'item 1' }}>
                            <button type="button" class={styles.contextMenuItem}>Yeni Klasör</button>
                        </MenuItem>
                        <MenuItem ydata={{ item: 'item 2' }}>
                            <button type="button" class={styles.contextMenuItem}>Dosya yükle</button>
                        </MenuItem>
                    </div>
                </ContextMenu>
            </div>     
        )
    }
}
export default Content;

