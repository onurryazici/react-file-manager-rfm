import axios from 'axios';
import classNames from 'classnames';
import { toast } from 'material-react-toastify';
import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl, Modal } from 'react-bootstrap';
import {  FaGgCircle, FaUserCircle,  } from 'react-icons/fa';
import { useSelector, useStore } from 'react-redux';
import { ADD_SHARED_WITH, CLEAR_SELECTED_ITEMS, DELETE_SHARED_WITH, SET_DIRECTORY_ITEMS, UPDATE_SHARED_WITH, CLEAR_SELECTED_SHARED_WITH} from '../context/functions';
import styles from '../styles.module.css'
//import NewShareView from '../views/newShareView';

function NewShareItemModal(props){
    const store                     = useStore();
    const [modalShow, setModalShow] = useState(false);
    const directoryItems            = useSelector((state) => state.directoryItems)
    const selectedItems             = useSelector((state) => state.selectedItems);
    const selectedItemCount         = useSelector((state) => state.selectedItemCount);
    const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;
    const [newUserFullAccess, setNewUserFullAccess] = useState(true);
    const [newUserReadOnly, setNewUserReadOnly]     = useState(false);
    const [newUserName, setNewUserName]             = useState("");
    const [usersToAdd, setusersToAdd]               = useState([]);
    const API_URL               = store.getState().config.API_URL;
    const API_URL_NewShareItem  = store.getState().config.API_URL_NewShareItem;
    const API_URL_IsUserExist   = store.getState().config.API_URL_IsUserExist;
    const rfmTokenName          = store.getState().config.tokenName;
  const PermissionType={
      FULL_ACCESS:"rwx",
      READ_ONLY:"r-x"
  }
  function NewShareItem(){
      axios.post(API_URL + API_URL_NewShareItem,{
              userData:usersToAdd,
              itemPath:selectedItems[0].absolutePath,
              token:localStorage.getItem(rfmTokenName)
          }).then((response)=>{
              if(response.data.statu === true){
                var reduced = directoryItems.filter((element) => element.name !== selectedItems[0].name);
                toast.dark(`${selectedItems[0].name} öğesi "Paylaştıklarım" klasörüne taşındı.`);
                store.dispatch(CLEAR_SELECTED_ITEMS());
                store.dispatch(SET_DIRECTORY_ITEMS(reduced));
                setModalShow(false);
              }
              else{
                toast.error(response.data.message);
              }
          }).catch((err)=>{
              toast.error(err);
          });
  }
  function AddUserToList(event){
      event.preventDefault();
      var exist = (selectedItems[0].sharedWith.some((item)=>item.username === newUserName) || selectedItems[0].owner === newUserName);
      axios.post(API_URL + API_URL_IsUserExist,{ user:newUserName, token:localStorage.getItem(rfmTokenName)})
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
      let newPermission = eventKey;
      let write   = (newPermission === PermissionType.FULL_ACCESS) ? true : false;
      let newUsers = usersToAdd.map(element => {
        const parsed = element.split(':')
        const _elementUsername   = parsed[0];
        if(_elementUsername === username){
          return _elementUsername + ":" + newPermission;
        }
        else{
          return element;
        }
      });
      setusersToAdd(newUsers);
      store.dispatch(UPDATE_SHARED_WITH(selectedItems[0].name,username,true,write,true))
  }
  function RemoveUserFromList(username){
      var users = usersToAdd.filter((element)=>{
        if(element===username+":rwx")
          return false
        else if(element=== username+":r-x")
          return false
        else
          return true
      });
      setusersToAdd(users)
      store.dispatch(DELETE_SHARED_WITH(selectedItems[0].name,username))
  }
  function ClearData(){
    setusersToAdd([]);
    setNewUserName("");
    store.dispatch(CLEAR_SELECTED_SHARED_WITH());
    setModalShow(false); 
  }

  return (
      <React.Fragment>
        {
          isContextMenuButton
            ?
              <Button variant="light" className={styles.contextMenuItem} onClick={() => setModalShow(true)}>
                  <div style={{fontSize:'14px'}}>Paylaş</div>
              </Button>
            :
              <Button variant="light" className={styles.actionbarButton} onClick={() => setModalShow(true)}>
                <div className={styles.actionbarIcon}><FaGgCircle color="#25b7d3"/></div>
                <div className={styles.actionbarText}>Paylaş</div>
              </Button>
        }
        
        <Modal show={modalShow} onHide={()=>ClearData() } aria-labelledby="contained-modal-title-vcenter" centered className={styles.noselect} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Paylaş
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              (selectedItems !== undefined && selectedItemCount === 1)
              ? 
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
                  
                      <div className={styles.flex}>
                          <div className={styles.shareUICol1}>
                              <FaUserCircle className={styles.shareUserLogo}/>
                              <span>{selectedItems[0].owner}</span>
                          </div>
                          <div className={styles.shareUICol2}>
                              <h6 className={styles.textCentered}>(Sahibi)</h6>
                          </div>                   
                      </div>
                      {       
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
                                      <Dropdown.Item eventKey={PermissionType.FULL_ACCESS} active={fullAccess} onSelect={(eventKey)=>TogglePermissionExistUser(eventKey,userElement.username)}>Tam Erişim</Dropdown.Item>
                                      <Dropdown.Item eventKey={PermissionType.READ_ONLY} active={readOnly} onSelect={(eventKey)=>TogglePermissionExistUser(eventKey,userElement.username)}>Salt Okunur</Dropdown.Item>
                                  </DropdownButton>
                                  <Button className={classNames(styles.noRadius,styles.shareUICol3,styles.height40,styles.mt10)} 
                                      variant="outline-danger" onClick={()=>RemoveUserFromList(userElement.username)}>Kaldır
                                  </Button>
                              </div>
                          )
                      })
                      }             
              </Form>
              : ""
            }
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => ClearData()} variant='outline-dark'>
                Vazgeç
              </Button>
              <Button onClick={() => MoveItems()} variant='primary' 
                  disabled={(usersToAdd.length === 0) ? true : false}
                  onClick={()=>NewShareItem()}>
                Paylaşımı Tamamla
              </Button>
            </Modal.Footer>
          </Modal>
      </React.Fragment>
    );
  }
export default NewShareItemModal;