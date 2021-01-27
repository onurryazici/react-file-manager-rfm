import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchCaller } from '../helper/global';
import { Actions } from '../context/actions';
import classNames from 'classnames'
import styles from '../styles.module.css'
import axios from 'axios';
import { toast } from 'material-react-toastify';

export default function ShareView() {
    const dispatch      = useDispatch();
    const selectedItems = useSelector((state) => state.selectedItems);
    const encryptedItem = Buffer.from(selectedItems[0].absolutePath).toString('base64');
    const [newUserFullAccess, setNewUserFullAccess] = useState(true);
    const [newUserReadOnly, setNewUserReadOnly]     = useState(false);
    const [newUserName, setNewUserName] = useState("");

    const ShareType={
        FOR_NEW_USER:"FOR_NEW_USER",
        FOR_EXISTING_USER:"FOR_EXISTING_USER"
    }
    const PermissionType={
        FULL_ACCESS:"FULL_ACCESS",
        READ_ONLY:"READ_ONLY"
    }

    function ShareItem(username,permission,type){
        axios.get("http://192.168.252.128:3030/api/shareItem",{
            params:{
                user:username,
                permissions: permission === PermissionType.FULL_ACCESS ? "rwx" : "r-x",
                item:encryptedItem
            }
            }).then((response)=>{
                if(response.data.statu === true){
                    let write   = (permission === PermissionType.FULL_ACCESS) ? true : false;
                    let payload = { 
                        itemName:selectedItems[0].name,
                        username:username,
                        read:true,
                        write:write,
                        execute:true
                    }
                    if(type === ShareType.FOR_NEW_USER){
                        DispatchCaller(dispatch,Actions.ADD_SHARED_WITH,payload)
                        toast.success("Öğe paylaşıldı");
                    }
                    else{
                        DispatchCaller(dispatch,Actions.UPDATE_SHARED_WITH,payload);
                    }
                }
                else
                   toast.error(response.data.message);
                }).catch((err)=>{
                    toast.error(err);
            });
    }
    function ShareWithNewUser(event){
        event.preventDefault();
        var exist = (selectedItems[0].sharedWith.some((item)=>item.username === newUserName) || selectedItems[0].owner === newUserName);
        if(!exist){
            if(newUserName.trim(' ').length > 0) {
                let newUserPermission = newUserFullAccess ? PermissionType.FULL_ACCESS : PermissionType.READ_ONLY;
                ShareItem(newUserName,newUserPermission,ShareType.FOR_NEW_USER);
            }
        }
    }
    function toggleNewUser(eventKey){
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
    function toggleExistUser(eventKey,username){
        ShareItem(username,eventKey,ShareType.FOR_EXISTING_USER);
    }
    function removeUserPermission(username){
        axios.get("http://192.168.252.128:3030/api/removePermission",{
            params:{
                user:username,
                item:encryptedItem
            }
            }).then((response)=>{
                if(response.data.statu === true){
                    let payload={
                        itemName:selectedItems[0].name,
                        username:username
                    }
                    DispatchCaller(dispatch,Actions.DELETE_SHARED_WITH,payload);
                }   
                else
                    toast.error(response.data.message);
                }).catch((err)=>{
                    toast.error(err);
            });
    }
    return (
        <Form autoComplete="off" onSubmit={ShareWithNewUser}>
            <div className={styles.flex}>
                <FormControl className={classNames(styles.noRadius,styles.bordered,styles.shareUICol1)} 
                    placeholder="Yeni kişi"
                    onChange={(e)=>setNewUserName(e.target.value)}/>
                <DropdownButton className={classNames(styles.noRadius,styles.bordered,styles.shareUICol2)} title={newUserFullAccess ? "Tam Erişim" : "Salt Okunur"} variant="">
                    <Dropdown.Item eventKey={PermissionType.FULL_ACCESS} onSelect={(e)=>toggleNewUser(e)} active={newUserFullAccess}>Tam Erişim </Dropdown.Item>
                    <Dropdown.Item eventKey={PermissionType.READ_ONLY}   onSelect={(e)=>toggleNewUser(e)} active={newUserReadOnly}  >Salt Okunur</Dropdown.Item>
                </DropdownButton>
                <Button as="input" type="submit" value="Davet et" variant="primary" className={classNames(styles.noRadius,styles.shareUICol3)}
                    disabled={newUserName.trim('').length < 1}/>
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
                                <Dropdown.Item eventKey={PermissionType.READ_ONLY} active={readOnly} onSelect={(eventKey)=>toggleExistUser(eventKey,userElement.username)}>Salt Okunur</Dropdown.Item>
                            </DropdownButton>
                            <Button className={classNames(styles.noRadius,styles.shareUICol3,styles.height40,styles.mt10)} 
                                variant="outline-danger" onClick={()=>removeUserPermission(userElement.username)}>Kaldır
                            </Button>
                        </div>
                    )
                })
                ]
            }
        </Form>
    )
}
