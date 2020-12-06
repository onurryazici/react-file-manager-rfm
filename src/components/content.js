import React, { useEffect, useState } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Actions } from '../../example/src/context/actions';
function Content() {
    const [Loading, setLoading] = useState(true);
    const currentLocation       = useSelector(state => state.location);
    const directoryItems        = useSelector(state => state.directoryItems);
    const dispatch              = useDispatch();
    const encryptedLocation     = Buffer.from(currentLocation).toString('base64');
    const username = "onur";
    useEffect(() => {
        axios.get("http://192.168.1.159:3030/api/getDirectory",{
            params:{
                location:encryptedLocation,
                username:"onur"
            }})
        .then((response)=>{
            setLoading(false);
            dispatch({type:Actions.SET_DIRECTORY_ITEMS,payload:response.data.items});
        });
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

