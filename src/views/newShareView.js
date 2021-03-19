import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import {  useSelector, useStore } from 'react-redux';
import { ADD_SHARED_WITH, DELETE_SHARED_WITH, UPDATE_SHARED_WITH } from '../context/functions';
import classNames from 'classnames'
import styles from '../styles.module.css'
import axios from 'axios';
import { toast } from 'material-react-toastify';

export default function NewShareView() {
    const store                                     = useStore();
    const selectedItems                             = useSelector((state) => state.selectedItems);
    const [newUserFullAccess, setNewUserFullAccess] = useState(true);
    const [newUserReadOnly, setNewUserReadOnly]     = useState(false);
    const [newUserName, setNewUserName]             = useState("");
    const [usersToAdd, setusersToAdd]               = useState([]);
    const API_URL               = store.getState().config.API_URL;
    const API_URL_ShareItem     = store.getState().config.API_URL_ShareItem;
    const API_URL_IsUserExist   = store.getState().config.API_URL_IsUserExist;
    

    const ShareType={
        FOR_NEW_USER:"FOR_NEW_USER",
        FOR_EXISTING_USER:"FOR_EXISTING_USER"
    }
    const PermissionType={
        FULL_ACCESS:"rwx",
        READ_ONLY:"r-x"
    }

    function ShareItem(username,permission,type){
        axios.post(API_URL + API_URL_ShareItem,{
                user:username,
                permissions: permission === PermissionType.FULL_ACCESS ? "rwx" : "r-x",
                item:selectedItems[0].absolutePath
            }).then((response)=>{
                if(response.data.statu === true){
                    let write   = (permission === PermissionType.FULL_ACCESS) ? true : false;
                    if(type === ShareType.FOR_NEW_USER){
                        store.dispatch(ADD_SHARED_WITH(selectedItems[0].name,username,true,write,true))
                        toast.success("Öğe paylaşıldı");
                    }
                    else{
                        store.dispatch(UPDATE_SHARED_WITH(selectedItems[0].name,username,true,write,true))
                    }
                }
                else
                   toast.error(response.data.message);
                }).catch((err)=>{
                    toast.error(err);
            });
    }
    function AddUserToList(event){
        event.preventDefault();
        var exist = (selectedItems[0].sharedWith.some((item)=>item.username === newUserName) || selectedItems[0].owner === newUserName);
        axios.post(API_URL + API_URL_IsUserExist,{ user:newUserName,})
            .then((response)=>{
                if(response.data.statu === true && !exist && newUserName.trim(' ').length > 0 ){
                    let newUserPermission = newUserFullAccess ? PermissionType.FULL_ACCESS : PermissionType.READ_ONLY;
                    let write   = (newUserPermission === PermissionType.FULL_ACCESS) ? true : false;
                    usersToAdd.push(newUserName+":"+newUserPermission);
                    store.dispatch(ADD_SHARED_WITH(selectedItems[0].name,newUserName,true,write,true))
                }
            })
    }
    function ToggleNewUserPermission(eventKey){
        if(eventKey===PermissionType.FULL_ACCESS)
        {
            setNewUserFullAccess(true);
            setNewUserReadOnly(false);
        }
        else{
            setNewUserFullAccess(false);
            setNewUserReadOnly(true);
        }
    }
    function TogglePermissionExistUser(eventKey,username){
        let permission = eventKey;
        let write   = (permission === PermissionType.FULL_ACCESS) ? true : false;
        store.dispatch(UPDATE_SHARED_WITH(selectedItems[0].name,username,true,write,true))
        //ShareItem(username,eventKey,ShareType.FOR_EXISTING_USER);
    }
    function RemoveUserFromList(username){
        var users = usersToAdd.filter((element)=> (element!== username+":rwx") && (element!== username+"r-x"));
        setusersToAdd(users)
        store.dispatch(DELETE_SHARED_WITH(selectedItems[0].name,username))
    }
    return (
        <Form autoComplete="off" onSubmit={AddUserToList}>
            <div className={styles.flex}>
                <FormControl className={classNames(styles.noRadius,styles.bordered,styles.shareUICol1)} 
                    placeholder="Yeni kişi"
                    onChange={(e)=>setNewUserName(e.target.value)}/>
                <DropdownButton className={classNames(styles.noRadius,styles.bordered,styles.shareUICol2)} title={newUserFullAccess ? "Tam Erişim" : "Salt Okunur"} variant="">
                    <Dropdown.Item eventKey={PermissionType.FULL_ACCESS} onSelect={(e)=>ToggleNewUserPermission(e)} active={newUserFullAccess}>Tam Erişim </Dropdown.Item>
                    <Dropdown.Item eventKey={PermissionType.READ_ONLY}   onSelect={(e)=>ToggleNewUserPermission(e)} active={newUserReadOnly}  >Salt Okunur</Dropdown.Item>
                </DropdownButton>
                <Button as="input" type="submit" value="Davet et" variant="primary" className={classNames(styles.noRadius,styles.shareUICol3)}
                    disabled={newUserName.trim(' ').length < 1}/>
            </div>
            {
                [<div className={styles.flex}>
                    <div className={styles.shareUICol1}>
                        <FaUserCircle className={styles.shareUserLogo}/>
                        <span>{selectedItems[0].owner}</span>
                    </div>
                    <div className={styles.shareUICol2}>
                        <h6 className={styles.textCentered}>(Sahibi)</h6>
                    </div>                   
                </div>,
                          
                selectedItems[0].sharedWith.map((userElement,index) => {
                    let fullAccess = (userElement.read === true && userElement.write === true) ? true : false;
                    let readOnly   = (userElement.read === true && userElement.write === false) ? true : false;
                    let selectedTitle = fullAccess ? "Tam Erişim" : "Salt Okunur";
                    return (
                        <div className={styles.flex} key={index}>
                            <div className={styles.shareUICol1}>
                                <FaUserCircle className={styles.shareUserLogo}/>
                                <span>{userElement.username}</span>
                            </div>
                            <DropdownButton className={classNames(styles.noRadius,styles.shareUICol2,styles.mt10)} variant="" title={selectedTitle} >
                                <Dropdown.Item eventKey={PermissionType.FULL_ACCESS} active={fullAccess} onSelect={(eventKey)=>toggleExistUser(eventKey,userElement.username)}>Tam Erişim</Dropdown.Item>
                                <Dropdown.Item eventKey={PermissionType.READ_ONLY} active={readOnly} onSelect={(eventKey)=>TogglePermissionExistUser(eventKey,userElement.username)}>Salt Okunur</Dropdown.Item>
                            </DropdownButton>
                            <Button className={classNames(styles.noRadius,styles.shareUICol3,styles.height40,styles.mt10)} 
                                variant="outline-danger" onClick={()=>RemoveUserFromList(userElement.username)}>Kaldır
                            </Button>
                        </div>
                    )
                }),
                <Button as="input" type="button" value="Paylaşımı Tamamla" onClick={()=>alert("ok")} 
                disabled={(usersToAdd.length === 0) ? true : false}/>,
                ]
            }
        </Form>
    )
}
