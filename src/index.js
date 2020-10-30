import React, { Component } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ReactComponent as Upload } from '../src/assets/svg/actionbar-icons/upload.svg'
import { ReactComponent as Plus } from '../src/assets/svg/actionbar-icons/plus.svg'
import Content from './components/Content';
import Placemap from './components/Placemap';
export default class RFM extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  render() {
    const {
      text,
      data,
      rfmBackgroundColor,
      itemColorParam,
    }=this.props
    return (
      <div className={styles.container} style={{backgroundColor:rfmBackgroundColor}}>
        <div id="actionbar-stage">
          <Button variant="light">
              <Plus style={{width:'30px',marginRight:'10px'}}/>Yeni
          </Button>
          <Button variant="light">
              <Upload style={{width:'30px',marginRight:'10px'}}/>Yükle
          </Button>
        </div>
        <Placemap/>
        <Content data={data}/>
        <FolderDetails/>
      </div>
    )
  }
}
