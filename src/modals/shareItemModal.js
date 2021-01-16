import React from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Table } from 'react-bootstrap';

import {  FaGgCircle, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'

function ShareItemModal(props){
    const [modalShow, setModalShow] = React.useState(false);
    const isContextMenuButton = props.isContextMenuButton === "yes" ? true : false;
    const selectedItems     = useSelector((state) => state.selectedItems);
    const selectedItemCount = useSelector((state) => state.selectedItemCount);
function ShareItem(){

}

    return (
      <div className={styles.noselect}>
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
        <Modal show={modalShow} onHide={()=>setModalShow(false) } size="s" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Paylaş
          </Modal.Title>
        </Modal.Header>
        <form autoComplete='off' onSubmit={ShareItem()}>
        <Modal.Body>
          <Form autoComplete="off">
            <Form.Group controlId="formFolderName">
            <InputGroup className="mb-3">
              <FormControl placeholder="Yeni kişi" aria-label="Yeni kişi" aria-describedby="basic-addon2" />
              <InputGroup.Append>
                <Button variant="outline-primary">Ekle</Button>
              </InputGroup.Append>
            </InputGroup>
              <Table hover>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (selectedItems !== undefined && selectedItemCount === 1)
                    ?[
                        <tr>
                          <td><FaUserCircle style={{color:"#" + Math.floor(Math.random()*16777215).toString(16),fontSize:'50px'}}/></td>
                          <td style={{lineHeight:'50px'}}>{selectedItems[0].owner}</td>
                          <td style={{float:'right'}}>
                            (Sahibi)
                          </td>
                        </tr>,
                        
                        selectedItems[0].sharedWith.map((userElement) => {
                          let randomColor = "#" + Math.floor(Math.random()*16777215).toString(16); //hex
                          return (
                            <tr>
                              <td><FaUserCircle style={{color:randomColor,fontSize:'50px'}}/></td>
                              <td style={{lineHeight:'50px'}}>{userElement.username}</td>
                              <td>
                                <DropdownButton style={{float:'right'}} menuAlign="right" variant="link" title="Düzenleyen" id="dropdown-menu-align-right">
                                    <Dropdown.Item eventKey="1">Düzenleyen</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Görüntüleyen</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="4">Sahibi yap</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">Kaldır</Dropdown.Item>
                                </DropdownButton>
                              </td>
                            </tr>
                          )
                        })
                      ]
                    : ""
                  }
                </tbody>
              </Table>
            </Form.Group>
          </Form>
          
        </Modal.Body>
        </form>
        <Modal.Footer>
          <Button onClick={()=>setModalShow(false)} variant="outline-dark">Vazgeç</Button>
          <Button as='input' type='submit' value='Paylaş'  variant='info' />
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
export default ShareItemModal;