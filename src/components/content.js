import React, { useEffect, useState } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import Item from './item'
import styles from '../styles.module.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import loadingAnim from '../assets/images/loading.gif';
function Content() {
    const [Items, setItems] = useState([]);
    const [Loading, setLoading] = useState(true);
    const currentLocation = useSelector(state => state.location);
    const encryptedLocation = Buffer.from(currentLocation).toString('base64');
    const username = "onur";
    useEffect(() => {
        axios.get("http://192.168.43.229:3030/api/getDirectory",{
            params:{
                location:encryptedLocation,
                username:"onur"
            }})
        .then((response)=>{
            setItems(response.data.items);
            setLoading(false);
        });
    },
    [currentLocation]
    );
        
    if(Loading)
    {
        return (
            <div id={styles.contentStage}>
                <div id={styles.loadingItem}>
                    <img src={loadingAnim}/>
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
                        {Items.length > 0 ? 
                            Items.map((item)=>{
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