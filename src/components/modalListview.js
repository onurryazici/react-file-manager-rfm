import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../context/actions';
import { DispatchCaller } from '../helper/global';
import styles from '../styles.module.css';
export default function ModalListView() {
    const dispatch        = useDispatch();
    const loading         = useSelector(state => state.modalLoading);
    const currentLocation       = useSelector(state => state.modalLocation);
    const directoryItems        = useSelector(state => state.modalDirectoryItems);
    const encryptedLocation     = Buffer.from(currentLocation).toString('base64');
    useEffect(() => {
        if(encryptedLocation !== ""){
            axios.get("http://192.168.252.128:3030/api/getDirectory",{
            params:{location:encryptedLocation}})
        .then((response)=>{
            DispatchCaller(dispatch,Actions.SET_MODAL_LOADING,false);
            DispatchCaller(dispatch,Actions.SET_MODAL_DIRECTORY_ITEMS,response.data.items);
        })
        .catch((err)=>{
            DispatchCaller(dispatch,Actions.SET_MODAL_LOADING,false);
            DispatchCaller(dispatch,Actions.SET_ERROR,true);
        })
        }
    },[currentLocation]);

    if(loading){
           return (<div id={styles.loadingSpinner}>
                loading
            </div>)
    }
    else
    return (
        directoryItems !== undefined && directoryItems.length > 0 
        ? 
            directoryItems.map((item)=>{
                return item.name
            })
        :"ss"
    )
}
