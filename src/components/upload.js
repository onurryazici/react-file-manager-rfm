import React, { useState } from 'react'
import { Accordion, Button, Card, FormLabel, ProgressBar } from 'react-bootstrap'
import { FaArrowDown, FaArrowUp, FaCheckCircle, FaChevronCircleDown, FaChevronCircleUp, FaExclamationTriangle, FaTimes, FaTimesCircle} from 'react-icons/fa'
import { connect, useSelector, useStore } from 'react-redux'
import { FileProgressType } from '../helper/global'
import { CLEAR_FILE_PROGRESS, SHOW_FILE_PROGRESS } from '../context/functions'
import classNames from 'classnames'
import styles from '../styles.module.css'

function Upload(props) {
    const [isOpen, setIsOpen] = useState(true);
    const store = useStore();
    const showFileProgress = useSelector(state => state.showFileProgress)

    function CheckFileProgress() {
        const progressList = store.getState().fileProgress;
        var listIsNotEmpty = Object.keys(progressList).some((element)=>(progressList[element]["completed"] !== true))
        console.log(listIsNotEmpty);
        if(listIsNotEmpty===false){
            store.dispatch(SHOW_FILE_PROGRESS(false));
            store.dispatch(CLEAR_FILE_PROGRESS());
        }
    }

    if(showFileProgress===false)
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
                            <Button variant="link" className={styles.uploadHeaderButtons} onClick={()=>CheckFileProgress()}>
                                <FaTimesCircle color={"#ff0018"}/>
                            </Button>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className={styles.uploadHeaderButtons} onClick={()=>setIsOpen(!isOpen)}>
                            { isOpen 
                              ? <FaChevronCircleDown color={"#f5e206"}/>
                              : <FaChevronCircleUp color={"#f5e206"}/>    }
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body className={styles.uploadInnerContainer}>
                        <React.Fragment>
                            <Button variant="link" style={{float:'right'}} onClick={()=>{store.dispatch(CLEAR_FILE_PROGRESS());}}>
                                Listeyi temizle
                            </Button>
                        <table>
                        {   Object.keys(props.fileProgress).map((i)=>{
                                let type       = props.fileProgress[i].type
                                let filename   = props.fileProgress[i].file
                                let progress   = props.fileProgress[i].progress
                                let failure    = props.fileProgress[i].failure
                                let completed  = props.fileProgress[i].completed
                                let source     = props.fileProgress[i].source
                                return (
                                    <React.Fragment>
                                            <tbody>
                                                <tr style={{borderTop:'solid thin #dedede'}}>
                                                    <td style={{width:'50px',verticalAlign:'middle'}}>
                                                    {   type === FileProgressType.UPLOAD
                                                        ? <div className={styles.uploadIcons}><FaArrowUp color="#0066CC"/></div>
                                                        : <div className={styles.uploadIcons}><FaArrowDown color="#28a745"/></div>  }    
                                                    </td>
                                                    <td className={styles.fileProgressFileNameTD} rowspan={2}>
                                                        <span className={styles.fileProgressName}>{filename}</span><br/>
                                                        <ProgressBar now={progress} className={styles.uploadLineProgressStyle} variant="warning"/>
                                                    </td>
                                                    <td style={{width:'50px',verticalAlign:'middle'}}>
                                                    {   failure 
                                                        ? <div className={styles.uploadIcons}><FaExclamationTriangle color="#f10000"/></div>
                                                        : 
                                                        completed 
                                                        ? <div className={styles.uploadIcons}><FaCheckCircle color="#15b239"/></div>
                                                        : <Button variant="light" className={styles.uploadCancelButton} onClick={()=>source.cancel('cancelled by user')}>
                                                                <div className={styles.uploadIcons}><FaTimes color="#FF0000"/></div>
                                                          </Button> }
                                                    </td>                                     
                                                </tr>
                                            </tbody>
                                    </React.Fragment>
                                )
                            })  }
                        </table>
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