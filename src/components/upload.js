import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, FormLabel, ProgressBar, Row } from 'react-bootstrap'
import { FaCheckCircle, FaChevronCircleDown, FaChevronCircleUp, FaRedo, FaTimes, FaTimesCircle } from 'react-icons/fa'
import classNames from 'classnames'
import styles from '../styles.module.css'
import { connect,  useStore } from 'react-redux'
import { size, toArray } from 'lodash'
import { SET_UPLOAD_PROGRESS, SUCCESS_UPLOAD_FILE, FAILURE_UPLOAD_FILE } from '../context/functions'
import axios from 'axios'
function Upload(props) {
    const store = useStore();
    const API_URL             = store.getState().config.API_URL;
    const API_URL_UploadItem  = store.getState().config.API_URL_UploadItem;
    const [isOpen, setIsOpen] = useState(true);
    const rfmTokenName        = store.getState().config.tokenName;
    useEffect(() => {
        if(size(props.fileProgress) > 0) {
            const fileToUpload = toArray(props.fileProgress).filter(file => file.progress===0 && !file.completed);
            UploadService(fileToUpload);
        }
    }, [size(props.fileProgress)])

    function UploadService(files) {
        Array.from(files).forEach(async (_file,_id) => {
            const formPayload = new FormData();
            formPayload.append('file', _file.file); 
        
            const config  = { 
                onUploadProgress: (ProgresEvent) => {
                    const {loaded, total} = ProgresEvent;
                    const percentage = Math.floor((loaded / total) * 100 );
                    store.dispatch(SET_UPLOAD_PROGRESS(_file.id, percentage));
                },
                token:localStorage.getItem(rfmTokenName)
            }
            await axios.post(API_URL+API_URL_UploadItem,formPayload, config)
                .then(()=>{
                    store.dispatch(SUCCESS_UPLOAD_FILE(_file.id));    
                }).catch((error)=>{
                alert("hata " + error)
                store.dispatch(FAILURE_UPLOAD_FILE(_file.id))
            })
        });
    }

    
    if(size(props.fileProgress) < 1)
    {
        return ""
    }
    else{
        return (
            <div className={classNames(styles.uploadDetailStage,styles.noselect)}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header className={styles.uploadHeader}>
                            <FormLabel style={{color:'white'}}>Yükleniyor</FormLabel>
                            <Accordion.Toggle as={Button} variant="link" className={styles.uploadHeaderButtons}>
                                <FaTimesCircle color={"#ff0018"}/>
                            </Accordion.Toggle>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className={styles.uploadHeaderButtons} onClick={()=>setIsOpen(!isOpen)}>
                                {
                                    isOpen 
                                    ? <FaChevronCircleDown color={"#f5e206"}/>
                                    : <FaChevronCircleUp color={"#f5e206"}/>
                                }
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body className={styles.uploadInnerContainer}>
                            {
                               Object.keys(props.fileProgress).map((i)=>{
                                    let id        = props.fileProgress[i].id;
                                    let filename  = props.fileProgress[i].file.name;
                                    let progress  = props.fileProgress[i].progress;
                                    let failure   = props.fileProgress[i].failure;
                                    let completed = props.fileProgress[i].completed;
                                    return (
                                        <React.Fragment>
                                            <Row>
                                                <Col sm={9}><Card.Text>{filename}</Card.Text></Col>
                                                <Col sm={3}>
                                                {
                                                    (failure) ? 
                                                    (<Button variant="light" className={styles.uploadCancelButton} onClick={() =>alert("heyha")}>
                                                        <div className={styles.uploadIcons}><FaRedo color="#0066CC"/></div>
                                                    </Button>)
                                                    : ((completed) ?
                                                    (
                                                        <div className={styles.uploadIcons}><FaCheckCircle color="#15b239"/></div>
                                                    )
                                                    :(<Button variant="light" className={styles.uploadCancelButton} onClick={() =>alert("heyha")}>
                                                        <div className={styles.uploadIcons}><FaTimes color="#FF0000"/></div>
                                                    </Button>))

                                                }
                                                
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={9}><ProgressBar now={progress} className={styles.uploadLineProgressStyle}/></Col>
                                                <Col sm={3}>
                                                    <h6 style={{textAlign:'center'}}>
                                                    {
                                                        failure 
                                                        ? "-"
                                                        : completed ? "100%"
                                                        : progress + "%"
                                                    }
                                                    </h6>
                                                </Col>
                                            </Row>
                                        </React.Fragment>
                                    )
                               })
                            }
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}
const mapStateToProps = state => ({
  fileProgress: state.fileProgress,
})



export default connect(mapStateToProps)(Upload)