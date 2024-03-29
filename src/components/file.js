import React from 'react'
import styles from '../styles.module.css'
import { FaFilePdf, FaFileWord, FaFileAlt,  FaFile, FaFileExcel, FaFileImage, FaJava, FaArchive, FaFileArchive} from 'react-icons/fa';
import { useStore } from 'react-redux';
function File(props){
    const fileName          = props.fileName;
    const absolutePath      = props.absolutePath;
    const extension         = props.extension;
    const viewMode          = props.viewMode;
    const RFM_Store         = useStore();
    const rfmTokenName      = RFM_Store.getState().config.tokenName;
    const API_URL           = RFM_Store.getState().config.API_URL;
    const API_URL_GetImage  = RFM_Store.getState().config.API_URL_GetImage;
    const token     	    = localStorage.getItem(rfmTokenName);
    const selectedClass     = (viewMode === "grid") ? styles.fileIconGrid : styles.itemIconList; /// burada düzenleme ypmk gerekcek gibi
    const selectedNameClass = (viewMode === "grid") ? styles.itemNameGrid : styles.itemNameList; /// burada düzenleme ypmk gerekcek gibi
    const imageStyles={
        width     : "auto",
        height    : "auto",
        maxWidth  : "100%",
        maxHeight : "100%",
        position  : "absolute",
        left      : 0,
        right     : 0,
        top       : 0,
        bottom    : 0,
        margin    : "auto",
        background: "#dedede"
    }
    const fileStyles={
        width     : 'auto',
        height    : '100px',
        maxWidth  : '100%',
        maxHeight : '100%',
        position  : 'absolute',
        inset     : '0px',
        margin    : 'auto'
    }



    function IconChooser( extension)
    {
        switch(extension)
        {
            case 'txt':
                return <FaFileAlt className={`${selectedClass}`} color="#ca4fa6" style={fileStyles}/>
            case 'docx':
                return <FaFileWord color="#0066cc" className={`${selectedClass}`} style={fileStyles} />
            case 'doc':
                return <FaFileWord color="#0066cc" className={`${selectedClass}`} style={fileStyles} />
            case 'pdf':
                return <FaFilePdf color="#d13131" className={`${selectedClass}`} style={fileStyles}/>
            case 'xlsx':
                return <FaFileExcel color="#1e7e34" className={`${selectedClass}`} style={fileStyles} />
            case 'xls':
                return <FaFileExcel color="#1e7e34" className={`${selectedClass}`} style={fileStyles} />
            case 'png':
            case 'jpg':
            case 'jpeg':
                return <img src={`${API_URL + API_URL_GetImage}?absolutePath=${absolutePath}&width=150&height=100&jwt=${token}`} style={imageStyles} className={`${selectedClass}`} />
            case 'js':
                return <FaJava color="#36bae1" className={`${selectedClass}`} style={fileStyles}/>
            case 'zip':
            case 'rar':
            case 'tgz':
                return <FaFileArchive color="#651a6e" className={`${selectedClass}`} style={fileStyles} />
            default:
                return <FaFile color="#777777" className={`${selectedClass}`}  style={fileStyles}/>;

        }
    }

    const divStyle = {
        height        : '130px', /*can be anything*/
        width         : '130px', /*can be anything*/
        display       : 'inline-block',
        verticalAlign : 'top', /*not required*/
        position      : 'relative',
    }
    return(
        <div>
            <div style={divStyle}>{IconChooser(extension)}</div>
            <div className={`${selectedNameClass}`}>{fileName}</div>
        </div>
    )
}
export default File;