import React, { useEffect } from 'react'
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu'
import { connect, useSelector, useStore } from 'react-redux'
import { FaDizzy } from 'react-icons/fa'
import { CLEAR_SELECTED_ITEMS, SET_CURRENT_DIR_CAN_WRITE, SET_CURRENT_REAL_PATH, SET_DIRECTORY_ITEMS, SET_LOADING } from '../redux/functions'
import { Alert } from 'react-bootstrap'
import { toast } from 'material-react-toastify'
import { RFM_WindowType } from '../helper/global'
import { RedirectToStart } from '../helper/events'
import Item from './item'
import styles from '../styles.module.css'
import axios from 'axios'
import CreateFolderModal from '../modals/createFolderModal'
import Upload from '../views/uploadButton'
import ItemPreviewModal from '../modals/itemPreviewModal'
import classNames from 'classnames'
import RFM_Socket from '../rfmSocket'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function Content(props) {
    const directoryItems        = props.directoryItems
    const loading               = useSelector(state => state.loading)
    const rfmError              = useSelector(state => state.hasError)
    const currentLocation       = useSelector(state => state.location)
    const startLocation         = useSelector(state => state.startLocation)
    const rfmWindow             = useSelector(state => state.rfmWindow)
    const depth                 = useSelector(state => state.depth)
    const API_URL               = useSelector(state => state.config.API_URL)
    const API_URL_GetDirectory  = useSelector(state => state.config.API_URL_GetDirectory)
    const currentDirCanWritable = useSelector(state => state.currentDirCanWritable)
    const RFM_Store             = useStore()
    const rfmTokenName          = RFM_Store.getState().config.tokenName
    const loggedUser            = useSelector(state => state.loggedUser)
    useEffect(() => {
        if(currentLocation !== ""){
            axios.post(API_URL + API_URL_GetDirectory,{
                location:currentLocation,
                rfmWindow: rfmWindow,
                token:localStorage.getItem(rfmTokenName)
            }).then((response)=>{
                RFM_Store.dispatch(SET_DIRECTORY_ITEMS(response.data.items))
                RFM_Store.dispatch(SET_CURRENT_DIR_CAN_WRITE(response.data.dirCanWritable))
                RFM_Store.dispatch(SET_CURRENT_REAL_PATH(response.data.currentRealPath))
                RFM_Store.dispatch(SET_LOADING(false))
                if(rfmWindow !== RFM_WindowType.DRIVE && rfmWindow !== RFM_WindowType.RECYCLE_BIN && depth !== 0){
                    const roomPath = response.data.currentRealPath
                    RFM_Socket.emit("JOIN_ROOM", loggedUser, roomPath)
                }
            }).catch((err)=>{
                toast.error("Bu dizine şu anda erişim sağlanamıyor")
                RedirectToStart()
            })
        }
    },[currentLocation])

    function clearSelection(event){
        if(event.target.id === styles.contents)
            RFM_Store.dispatch(CLEAR_SELECTED_ITEMS(null))
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
                    <div className={classNames(styles.loading__,styles.noselect)}>
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
                                {
                                    (currentDirCanWritable)
                                    ?
                                    [<MenuItem>
                                        <CreateFolderModal isContextMenuButton="yes" active={true} />
                                    </MenuItem>,
                                    <MenuItem>
                                        <Upload isContextMenuButton="yes" active={true}/>
                                    </MenuItem>]
                                    :
                                    [<MenuItem>
                                    <CreateFolderModal isContextMenuButton="yes" active={false}/>
                                    </MenuItem>,
                                    <MenuItem>
                                        <Upload isContextMenuButton="yes" active={false}/>
                                    </MenuItem>]
                                }
                                
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
export default connect(mapStateToProps)(Content)