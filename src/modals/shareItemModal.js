import React from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Table } from 'react-bootstrap';
import classNames from 'classnames'
import {  FaGgCircle, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'

function ShareItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const selectedItems             = useSelector((state) => state.selectedItems);
    const selectedItemCount         = useSelector((state) => state.selectedItemCount);
    const isContextMenuButton       = props.isContextMenuButton === "yes" ? true : false;

    function ShareItem(){

    }

    function toggle(eventKey,username){
      console.log(e);
    }
    return (
      <div>
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
        
        <Modal show={modalShow} onHide={()=>setModalShow(false) }  aria-labelledby="contained-modal-title-vcenter" centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Paylaş
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form autoComplete="off" onSubmit={ShareItem}>
              <div className={styles.flex}>
                <FormControl className={classNames(styles.noRadius,styles.bordered,styles.shareUICol1)} placeholder="Yeni kişi" aria-label="Yeni kişi" aria-describedby="basic-addon2" />
                <DropdownButton className={classNames(styles.noRadius,styles.bordered,styles.shareUICol2)} variant="" title="Tam Erişim" >
                    <Dropdown.Item eventKey="1" active>Tam Erişim</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Salt Okunur</Dropdown.Item>
                </DropdownButton>
                <Button className={classNames(styles.noRadius,styles.shareUICol3)} variant="outline-primary">Ekle</Button>
              </div>
              {
                  (modalShow && selectedItems !== undefined && selectedItemCount === 1)
                      ?[
                          <div className={styles.flex}>
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
                                <DropdownButton className={classNames(styles.noRadius,styles.shareUICol2)} variant="" title={selectedTitle} >
                                  <Dropdown.Item eventKey="1" active={fullAccess} onSelect={(e)=>toggle(e)}>Tam Erişim</Dropdown.Item>
                                  <Dropdown.Item eventKey="2" active={readOnly} onSelect={(eventKey)=>toggle(eventKey)}>Salt Okunur</Dropdown.Item>
                                </DropdownButton>
                                <Button className={classNames(styles.noRadius,styles.shareUICol3,styles.height40)} variant="outline-danger">Kaldır</Button>
                              </div>
                            )
                          })
                        ]
                      : ""
                    }
              </Form>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
export default ShareItemModal;