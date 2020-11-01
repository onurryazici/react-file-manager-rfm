import React from 'react'
import { Button } from 'react-bootstrap';
import { ReactComponent as Upload } from '../assets/svg/actionbar-icons/upload.svg'
import { ReactComponent as Plus} from '../assets/svg/actionbar-icons/plus.svg'
import styles from '../styles.module.css'
function Actionbar() {
    return (
        
        <div id={styles.actionbarStage}>
          <Button variant="light">
              <Plus style={{width:'30px',marginRight:'10px'}}/>Klasör Oluştur
          </Button>
          <Button variant="light">
              <Upload style={{width:'30px',marginRight:'10px'}}/>Yükle
          </Button>
        </div>
    )
}
export default Actionbar;