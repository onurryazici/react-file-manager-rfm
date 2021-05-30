import { size } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
function FolderDetails(){
    const selectedItems     = useSelector(state => state.selectedItems)
    const directoryItems    = useSelector(state => state.directoryItems);
    const loading    = useSelector(state => state.loading);
    
    let fileCount         = 0;
    let folderCount       = 0;

    directoryItems !== undefined ? directoryItems.filter(item => (item.type==="file")   ? fileCount++   : "") : "";
    directoryItems !== undefined ? directoryItems.filter(item => (item.type==="directory" || item.type==="symbolic") ? folderCount++ : "") : "";

    var message = "";
    
    if(folderCount > 0){
        message = folderCount + " klasör";
        if(fileCount > 0)
            message = message + " - " + fileCount + " dosya";
    }
    else if (fileCount > 0 && folderCount === 0){
        message = fileCount + " dosya"
    }
    else{
        message = "Görüntülenecek öğe bulunamadı."
    }
    return(
        <div className={styles.folderDetails}>
            {
                loading ?  <div id={styles.detailLoadingSpinner}>Loading...</div> :
                    size(selectedItems) > 0
                        ? size(selectedItems) + " öğe seçildi."
                        : message
            }
        </div>
    )
}
export default FolderDetails;