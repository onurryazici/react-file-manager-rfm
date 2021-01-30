import React from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import styles from '../styles.module.css'
export default function UploadDetails() {
    const dispatch = useDispatch();
    return (
        <div className={styles.uploadDetailStage}>
            <Accordion>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Click me!
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
