import React, { useEffect } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../example/src/context/actions';
import { DispatchCaller } from '../helper/global';
import Item from './item'
import styles from '../styles.module.css'
import axios from 'axios';
import CreateFolderModal from '../modals/createFolderModal';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

function Content() {
    const loading               = useSelector(state => state.loading);
    const currentLocation       = useSelector(state => state.location);
    const directoryItems        = useSelector(state => state.directoryItems);
    const showHiddenFilesValue  = useSelector(state => state.showHiddenFiles);
    const dispatch              = useDispatch();
    const encryptedLocation     = Buffer.from(currentLocation).toString('base64');
    const username = "main";


    useEffect(() => {
        axios.get("http://localhost:3030/api/getDirectory",{
            params:{
                location:encryptedLocation,
                username:username,
                showHiddenFiles:showHiddenFilesValue
            }})
        .then((response)=>{
            DispatchCaller(dispatch,Actions.SET_LOADING,false);
            DispatchCaller(dispatch,Actions.SET_DIRECTORY_ITEMS,response.data.items);
        })
    },
    [currentLocation]
    );
    if(loading)
    {
        return (
            <div id={styles.contentStage}>
                <div id={styles.loadingSpinner}>
                  loading
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div id={styles.contentStage} >
                <ContextMenuTrigger id="mainTrigger">
                    <div id={styles.contents} >
                        {directoryItems.length > 0 
                            ? 
                                directoryItems.map((item)=>{
                                    return (<Item 
                                        key = {item.name}
                                        name = {item.name}
                                        type={item.type} 
                                        extension={item.extension}/>)})
                            :""
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id="mainTrigger">
                    <div className={styles.contextMenuStage}>
                        <MenuItem>
                            <CreateFolderModal isContextMenuButton="yes"/>
                        </MenuItem>
                        <MenuItem>
                            <button type="button" class={styles.contextMenuItem}>Dosya yükle</button>
                        </MenuItem>
                    </div>
                </ContextMenu>
            </div>     
        )
    }
}
export default Content;

