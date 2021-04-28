import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import { connect, useSelector, useStore } from 'react-redux';
import { SET_PREVIEW_ACTIVE } from '../context/functions';
import styles from '../styles.module.css'
function ItemPreviewModal(props) {
    const isPreviewActive = props.isPreviewActive;
    const previewData     = props.previewData;
    const store = useStore();
    useEffect(() => {
        setModalShow(isPreviewActive)
    }, [isPreviewActive])

    const [modalShow, setModalShow] = React.useState(isPreviewActive);
    return (
        modalShow ?
      <React.Fragment>
        <Modal show={modalShow} onHide={()=>{setModalShow(false); store.dispatch(SET_PREVIEW_ACTIVE(false)) } } size="lg" aria-labelledby="contained-modal-title-vcenter" className={styles.noselect} >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Resim Önizlemesi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:'0px'}} >
            <div className={styles.previewContainer}>
              <img className={styles.previewFitCenter} src={previewData} style={{maxWidth:'100%'}}/>
            </div>
        </Modal.Body>
      </Modal>
      </React.Fragment>
      :""
    );
}

const mapStateToProps = state => ({
    isPreviewActive: state.isPreviewActive,
    previewData:state.previewData
})
export default connect(mapStateToProps)(ItemPreviewModal);