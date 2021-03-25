import React from 'react'
import OnItemSelectedView from '../views/onItemSelectedView';
import OnStartView from '../views/onStartView';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { RFM_WindowType } from '../helper/global';
const Actionbar = () => {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const rfmWindow = useSelector(state=> state.rfmWindow);
    return (
        !(rfmWindow === RFM_WindowType.RECYCLE_BIN) ?
        <div id={styles.actionbarStage}>   
        {
            
                (selectedItemCount>0)
                    ? <OnItemSelectedView/>
                    : <OnStartView/>
        }
        </div>
        : ""
    )
}
export default Actionbar;