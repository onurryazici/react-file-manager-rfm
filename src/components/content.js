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
import { size } from 'lodash';

function Content(props) {
    const loading               = useSelector(state => state.loading);
    const rfmError              = useSelector(state => state.hasError);
    const currentLocation       = useSelector(state => state.location);
    const directoryItems        = props.directoryItems;
    const store                 = useStore();
    const encryptedLocation     = Buffer.from(currentLocation).toString('base64');

    useEffect(() => {
        if(encryptedLocation !== ""){
            axios.get("http://192.168.252.128:3030/api/getDirectory",{
            params:{location:encryptedLocation}})
        .then((response)=>{
            store.dispatch(SET_DIRECTORY_ITEMS(response.data.items));
            store.dispatch(SET_LOADING(false))

        })
        .catch((err)=>{
            console.log(err)
            store.dispatch(SET_LOADING(false));
            store.dispatch(SET_ERROR(true));
        })
        }
    },[currentLocation]);

    function clearSelection(event){
        if(event.target.id === styles.contents)
            store.dispatch(CLEAR_SELECTED_ITEMS(null));
    }

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
            <div id={styles.contentStage} className={styles.noselect} 
                onClick={(event)=>clearSelection(event)}>
                <ContextMenuTrigger id="mainTrigger">
                    <div id={styles.contents} >
                        { directoryItems !== undefined && directoryItems.length > 0 
                            ? 
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
                            <Upload isContextMenuButton="yes"/>
                        </MenuItem>
                    </div>
                </ContextMenu>
                
            </div>     
        )
    }
}

const mapStateToProps = state => ({
    directoryItems: state.directoryItems,
})
export default connect(mapStateToProps)(Content);

