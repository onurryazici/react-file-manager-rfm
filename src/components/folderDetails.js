import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../styles.module.css'
function FolderDetails(){
    let selectedItemCount = useSelector(state => state.selectedItemCount);
    let directoryItems    = useSelector(state => state.directoryItems);
    let loading           = useSelector(state => state.loading);
    let fileCount         = 0;
    let folderCount       = 0;

    directoryItems.filter(item => (item.type==="file")   ? fileCount++   : "");
    directoryItems.filter(item => (item.type==="folder") ? folderCount++ : "");

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
                loading ? "Yükleniyor..." :
                    selectedItemCount > 0
                        ? selectedItemCount + " öğe seçildi."
                        : message
            }
        </div>
    )
}
export default FolderDetails;