import React from 'react'
import styles from '../styles.module.css'
function FolderDetails(props){
        return(
            <div className={styles.folderDetails}>
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