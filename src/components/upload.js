import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, FormLabel, ProgressBar, Row, Table } from 'react-bootstrap'
import { FaArrowDown, FaArrowUp, FaCheckCircle, FaChevronCircleDown, FaChevronCircleUp, FaRedo, FaTimes, FaTimesCircle, FaUpload } from 'react-icons/fa'
import classNames from 'classnames'
import styles from '../styles.module.css'
import { connect,  useStore } from 'react-redux'
import { size, toArray } from 'lodash'
import { UploadService } from '../helper/events'
import { FileProgressType } from '../helper/global'
function Upload(props) {
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        if(size(props.fileProgress) > 0) {
            const fileToUpload = toArray(props.fileProgress).filter(file => file.progress===0 && !file.completed && file.type===FileProgressType.UPLOAD);
            UploadService(fileToUpload);
        }
    }, [props.showFileProgress])
    
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
                            <FormLabel style={{color:'white'}}>Dosya İşlemleri</FormLabel>
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
                        <React.Fragment>
                            <Button variant="link" style={{float:'right'}}>Tamamlananları temizle</Button>
                        {
                            Object.keys(props.fileProgress).map((i)=>{
                                let id        = props.fileProgress[i].id;
                                let type      = props.fileProgress[i].type;
                                let filename  = props.fileProgress[i].file;
                                let progress  = props.fileProgress[i].progress;
                                let failure   = props.fileProgress[i].failure;
                                let completed = props.fileProgress[i].completed;
                                return (
                                    <React.Fragment>
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td style={{width:'50px',verticalAlign:'middle'}}>
                                                        {
                                                            type===FileProgressType.UPLOAD
                                                            ? <FaArrowUp color="#0066CC" className={styles.uploadIcons}/>
                                                            : <FaArrowDown color="#28a745" className={styles.uploadIcons}/>
                                                        }
                                                        
                                                    </td>
                                                    <td style={{width:'280px'}} rowspan={2}>
                                                        <div className={styles.fileProgressName}>{filename}</div><br/>
                                                        <ProgressBar now={progress} className={styles.uploadLineProgressStyle} variant="warning"/>
                                                    </td>
                                                    <td style={{width:'50px',verticalAlign:'middle'}}>
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
                                                    </td>                                     
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </React.Fragment>
                                )
                            })
                        }
                        </React.Fragment>
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