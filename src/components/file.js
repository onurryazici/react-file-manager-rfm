import React from 'react'
import styles from '../styles.module.css'
import { FaFilePdf, FaFileWord, FaFileAlt,  FaFile, FaFileExcel} from 'react-icons/fa'
function File(props){
    const fileId    = props.fileId;
    const fileName  = props.fileName;
    const extension = props.extension;
    
    const viewMode = props.viewMode;
    
    const selectedClass = viewMode === "grid" ? styles.itemIconGrid : styles.itemIconList;
    const selectedNameClass = viewMode === "grid" ? styles.itemNameGrid : styles.itemNameList;
    function iconChooser( extension)
    {
        switch(extension)
        {
            case '.txt':
                return <FaFileAlt className={`${selectedClass}`} color="#1c96a9" style={{width:'110px', height:"110px",marginLeft:"11px"}}/>
            case 'docx' || '.doc':
                return <FaFileWord color="#0066cc" className={`${selectedClass}`}  style={{width:'110px', height:"110px",marginLeft:"11px"}} />
            case '.pdf':
                return <FaFilePdf color="#d13131" className={`${selectedClass}`}  style={{width:'110px', height:"110px",marginLeft:"11px"}}/>
            case 'xlsx':
                return <FaFileExcel color="#1e7e34" className={`${selectedClass}`}  style={{width:'110px', height:"110px",marginLeft:"11px"}}/>
            default:
                return <FaFile color="#777777" className={`${selectedClass}`}  style={{width:'110px', height:"110px",marginLeft:"11px"}}/>;

        }
    }
    return(
        <div>
            {iconChooser(extension)}    
            <div className={`${selectedNameClass}`}>{fileName}</div>
        </div>
    )
}
export default File;