import React from 'react'
import { Button } from 'react-bootstrap';
import { FaChevronCircleUp } from 'react-icons/fa';
import CreateFolderModal from '../modals/createFolderModal';
import styles from '../styles.module.css';
import ShareItemModal from '../modals/shareItemModal'
import RemoveItemModal from '../modals/removeItemModal'
import MoveItemModal from '../modals/moveItemModal'
import RenameItemModal from '../modals/renameItemModal'
import CopyItem from '../modals/copyItem';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../example/src/context/actions';
function OnItemSelectedView() {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const dispatch = useDispatch();
    function dispatchInvoker(typeValue,payloadValue)
    {
        return dispatch({type:typeValue, payload:payloadValue});
    }
    function clearSelection(){
        dispatchInvoker(Actions.CLEAR_SELECTED_ITEMS);
    }
    return (
        <div>
            <ShareItemModal/>
            <RemoveItemModal/>
            <MoveItemModal />
            <CopyItem/>
            {selectedItemCount === 1 ? <RenameItemModal/> : ""}
            <Button variant="link" onClick={()=>clearSelection()}>Seçimi temizle</Button>
        </div>
    )
}
export default OnItemSelectedView;