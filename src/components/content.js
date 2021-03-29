import React, { useEffect } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu';
import { connect, useDispatch, useSelector, useStore } from 'react-redux';
import Item from './item'
import styles from '../styles.module.css'
import axios from 'axios';
import CreateFolderModal from '../modals/createFolderModal';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { FaDizzy } from 'react-icons/fa';
import { Alert } from 'react-bootstrap';
import Upload from '../views/uploadButton';
import { CLEAR_SELECTED_ITEMS, SET_DIRECTORY_ITEMS, SET_ERROR, SET_LOADING } from '../context/functions';
import ItemPreviewModal from '../modals/itemPreviewModal';
import { RFM_WindowType } from '../helper/global';
function Content(props) {
    const directoryItems        = props.directoryItems;
    const loading               = useSelector(state => state.loading);
    const rfmError              = useSelector(state => state.hasError);
    const currentLocation       = useSelector(state => state.location);
    const rfmWindow             = useSelector(state => state.rfmWindow);
    const depth                 = useSelector(state => state.depth)
    const API_URL               = useSelector(state => state.config.API_URL);
    const API_URL_GetDirectory  = useSelector(state => state.config.API_URL_GetDirectory);
    const store                 = useStore();

    useEffect(() => {
        if(currentLocation !== ""){
            axios.post(API_URL + API_URL_GetDirectory,{
                location:currentLocation,
                rfmWindow: rfmWindow,
                token:localStorage.getItem("user-token")
            }).then((response)=>{
                store.dispatch(SET_DIRECTORY_ITEMS(response.data.items));
                store.dispatch(SET_LOADING(false))
            }).catch((err)=>{
                store.dispatch(SET_LOADING(false));
                store.dispatch(SET_ERROR(true));
            })
        }
    },[currentLocation]);

    function clearSelection(event){
        if(event.target.id === styles.contents)
            store.dispatch(CLEAR_SELECTED_ITEMS(null));
    }

    if(rfmError)
        return (<div id={styles.contentStage}>
                    <div id={styles.contentMessage}>
                        <FaDizzy style={{fontSize:'90px',color:'#2c3f52'}} />
                        <br/><br/>
                        <Alert variant="dark">
                            <Alert.Heading>Bir sorunla karşılaştık.</Alert.Heading><hr />
                            <p className="mb-0">Bu bir ağ sorununu veya oturum süresinin sonlandığını gösteriyor olabilir.</p>
                        </Alert>
                    </div>
                </div>)
    else if(loading)
        return (
            <div id={styles.contentStage}>
                <div id={styles.loadingContainer}>
                    <div className={styles.loading__}>
                        <div class={styles.loading__letter}>.</div>
                        <div class={styles.loading__letter}>.</div>
                        <div class={styles.loading__letter}>.</div>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div id={styles.contentStage} className={styles.noselect}>
                <ContextMenuTrigger id="mainTrigger">
                    <div id={styles.contents} onClick={(event)=>clearSelection(event)} onContextMenu={(event)=>clearSelection(event)} >
                        {(directoryItems !== undefined && directoryItems.length > 0 ) ? 
                            directoryItems.map((item)=>{
                                return (<Item 
                                    key       = {item.name}
                                    name      = {item.name}
                                    type      = {item.type} 
                                    owner     = {item.owner}
                                    extension = {item.extension}
                                    absolutePath   = {item.absolutePath}
                                    size           = {item.size}
                                    read           = {item.read}
                                    write          = {item.write}
                                    sharedWith     = {item.sharedWith}
                                    lastAccessTime = {item.lastAccessTime}
                                    lastModifyTime = {item.lastModifyTime}
                                    restorePath    = {item.restorePath} // if needed
                                />)})
                            : ""
                        }
                    </div>
                </ContextMenuTrigger>
                {
                    !(rfmWindow === RFM_WindowType.RECYCLE_BIN) ?
                        ((rfmWindow === RFM_WindowType.DRIVE)) ||
                        ((rfmWindow === RFM_WindowType.SHARED_WITH_ME) && depth > 0) ||
                        ((rfmWindow === RFM_WindowType.MY_SHARED) && depth > 0) ?
                        <ContextMenu id="mainTrigger">
                            <div className={styles.contextMenuStage}>
                                <MenuItem>
                                    <CreateFolderModal isContextMenuButton="yes"/>
                                </MenuItem>
                                <MenuItem>
                                    <Upload isContextMenuButton="yes"/>
                                </MenuItem>
                            </div>
                        </ContextMenu>
                        :""
                    :""
                }
                <ItemPreviewModal/>
            </div>     
        )
    }
const mapStateToProps = (state) => ({directoryItems: state.directoryItems})
export default connect(mapStateToProps)(Content);