import React from 'react'
import OnItemSelectedView from '../views/onItemSelectedView';
import OnStartView from '../views/onStartView';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { RFM_WindowType } from '../helper/global';
const Actionbar = () => {
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const rfmWindow         = useSelector(state=> state.rfmWindow);
    const depth             = useSelector(state => state.depth)
    return (
        !(rfmWindow === RFM_WindowType.RECYCLE_BIN) ?
            ((rfmWindow === RFM_WindowType.DRIVE)) ||
            ((rfmWindow === RFM_WindowType.SHARED_WITH_ME) && (depth > 0)) ||
            ((rfmWindow === RFM_WindowType.MY_SHARED) && (depth > 0)) ?
            <div id={styles.actionbarStage}>   
            {
                !(rfmWindow === RFM_WindowType.RECYCLE_BIN)?
                    (selectedItemCount>0)
                        ? <OnItemSelectedView/>
                        : <OnStartView/>
                : ""
            }
            </div>
            : ""
        : ""
    )
}
export default Actionbar;