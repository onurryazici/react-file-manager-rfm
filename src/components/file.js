import React from 'react'
import styles from '../styles.module.css'
import { FaFilePdf, FaFileWord, FaFileAlt,  FaFile, FaFileExcel, FaFileImage, FaJava} from 'react-icons/fa';
function File(props){
    const fileId    = props.fileId;
    const fileName  = props.fileName;
    const absolutePath = props.absolutePath;
    const extension = props.extension;
    const viewMode = props.viewMode;
    
    const selectedClass = viewMode === "grid" ? styles.fileIconGrid : styles.itemIconList; /// burada düzenleme ypmk gerekcek gibi
    const selectedNameClass = viewMode === "grid" ? styles.itemNameGrid : styles.itemNameList; /// burada düzenleme ypmk gerekcek gibi

    function iconChooser( extension)
    {
        switch(extension)
        {
            case 'txt':
                return <FaFileAlt className={`${selectedClass}`} color="#ca4fa6"/>
            case 'docx':
                return <FaFileWord color="#0066cc" className={`${selectedClass}`} />
            case 'doc':
                return <FaFileWord color="#0066cc" className={`${selectedClass}`} />
            case 'pdf':
                return <FaFilePdf color="#d13131" className={`${selectedClass}`}/>
            case 'xlsx':
                return <FaFileExcel color="#1e7e34" className={`${selectedClass}`} />
            case 'xls':
                return <FaFileExcel color="#1e7e34" className={`${selectedClass}`} />
            case 'png':
                return <FaFileImage color="#36bae1" className={`${selectedClass}`} />
            case 'jpg':
                return <FaFileImage color="#36bae1" className={`${selectedClass}`} />
            case 'js':
                return <FaJava color="#36bae1" className={`${selectedClass}`}/>
            default:
                return <FaFile color="#777777" className={`${selectedClass}`} />;

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