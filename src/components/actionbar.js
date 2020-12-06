import React from 'react'
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import OnItemSelectedView from '../views/onItemSelectedView';
import OnStartView from '../views/onStartView';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
const Actionbar = () => {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    return (
        <div id={styles.actionbarStage}>   
        {
            (selectedItemCount>0)
                ? <OnItemSelectedView/>
                : <OnStartView/>
        }
        </div>
    )
}
export default Actionbar;