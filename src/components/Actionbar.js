import React from 'react'
import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import RfmConsumer from '../../example/src/context';
import OnItemSelectedView from '../views/onItemSelectedView';
import OnStartView from '../views/onStartView';
function Actionbar() {
    return (
        <div id={styles.actionbarStage}>
            <RfmConsumer>
            {
                value =>{
                    const {isItemSelected} = value;
                    return (
                        (isItemSelected)
                            ? <OnItemSelectedView/>
                            : <OnStartView/>
                    )
                }
            }
            </RfmConsumer>
        </div>
    )
}
export default Actionbar;