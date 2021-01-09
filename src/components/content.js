import React, { useEffect } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../context/actions';
import { DispatchCaller } from '../helper/global';
import Item from './item'
import styles from '../styles.module.css'
import axios from 'axios';
import CreateFolderModal from '../modals/createFolderModal';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { FaDizzy } from 'react-icons/fa';
import { Alert } from 'react-bootstrap';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';

function Content() {
    const loading               = useSelector(state => state.loading);
    const rfmError              = useSelector(state => state.hasError);
    const currentLocation       = useSelector(state => state.location);
    const directoryItems        = useSelector(state => state.directoryItems);
    const showHiddenFilesValue  = useSelector(state => state.showHiddenFiles);
    const dispatch              = useDispatch();
    const encryptedLocation     = Buffer.from(currentLocation).toString('base64');
    const username = "main";


    useEffect(() => {
        if(encryptedLocation !== ""){
            axios.get("http://192.168.252.128:3030/api/getDirectory",{
            params:{
                location:encryptedLocation,
                username:username,
                showHiddenFiles:showHiddenFilesValue
            }})
        .then((response)=>{
            console.log(response);
            DispatchCaller(dispatch,Actions.SET_LOADING,false);
            DispatchCaller(dispatch,Actions.SET_DIRECTORY_ITEMS,response.data.items);
        })
        .catch((err)=>{
            console.log("bir hata oluştu"+err)
        })
        }
    },
    [currentLocation]
    );

    if(rfmError){
        return (<div id={styles.contentStage}>
                
                  <div id={styles.contentMessage}>
                        <FaDizzy style={{fontSize:'90px',color:'#2c3f52'}} />
                        <br/><br/>
                        <Alert variant="dark">
                            <Alert.Heading>Bir sorunla karşılaştık.</Alert.Heading>
                            <hr />
                            <p className="mb-0">
                            Bu bir ağ sorununu veya oturum süresinin sonlandığını gösteriyor olabilir.
                            </p>
                        </Alert>
                  </div>
                
            </div>)
    }
    else if(loading)
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
                        { directoryItems !== undefined && directoryItems.length > 0 
                            ? 
                                directoryItems.map((item)=>{
                                    return (<Item 
                                        key = {item.name}
                                        name = {item.name}
                                        type={item.type} 
                                        extension={item.extension}
                                        size={item.size}
                                        read={item.read}
                                        write={item.write}
                                        lastAccessTime={item.lastAccessTime}
                                        lastModifyTime={item.lastModifyTime}
                                        />)})
                            : ""
                        }
                    </div>
                </ContextMenuTrigger>
                <ContextMenu id="mainTrigger">
                    <div className={styles.contextMenuStage}>
                        <MenuItem>
                            <CreateFolderModal isContextMenuButton="yes"/>
                        </MenuItem>
                        <MenuItem>
                            <button type="button" className={styles.contextMenuItem}>Dosya yükle</button>
                        </MenuItem>
                    </div>
                </ContextMenu>
                <NotificationContainer></NotificationContainer>
            </div>     
        )
    }
}
export default Content;

