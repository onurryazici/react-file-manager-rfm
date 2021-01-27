import React from 'react'
import OnItemSelectedView from '../views/onItemSelectedView';
import OnStartView from '../views/onStartView';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css';
const Actionbar = () => {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    return (
        <div id={styles.actionbarStage} className={styles.animateLeft}>   
        {
            (selectedItemCount>0)
                ? <OnItemSelectedView/>
                : <OnStartView/>
        }
        </div>
    )
}
export default Actionbar;