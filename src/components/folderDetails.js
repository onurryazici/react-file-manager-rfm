import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
function FolderDetails(){
    const selectedItemCount = useSelector(state => state.selectedItemCount);
    const directoryItems = useSelector(state => state.directoryItems);
    return(
        
        <div className={styles.folderDetails}>
            {
                selectedItemCount > 0
                    ? selectedItemCount + " öğe seçildi."
                    : ""
            }
           {/*} <RfmConsumer>
            {
                value=>{
                    const {selectedItemCount} = value;
                    return(
                        (selectedItemCount>0)
                        ? selectedItemCount + " öğe seçildi" 
                        : props.folderCount + "klasör - " + props.fileCount + " Dosya"
                    )
                }
            }
            
             
        </RfmConsumer>*/}
        </div>
    )
}

export default FolderDetails;