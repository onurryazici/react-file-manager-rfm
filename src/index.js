import React, { Component } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css';
import Content from './components/content';
import Placemap from './components/placemap';
import FolderDetails from './components/folderDetails';
import Actionbar from './components/actionbar';
import RfmConsumer, { RfmProvider } from '../example/src/context';
export default class RFM extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  render() {
    const data=[
      {
        id:1,
        itemName:"onurwwwwwwwwwwwwwwwwww",
        type:"folder"
      },
      {
        id:2,
        itemName:"onur.txt",
        type:"file"
      },
    ]
    const {
      text,
      rfmBackgroundColor,
      rfmBorderColor,
      itemColorParam,
    }=this.props
    return (
      <RfmProvider>
        <div className={styles.container} style={{backgroundColor:rfmBackgroundColor}}>
          <Actionbar/>
          <Placemap/>
          <Content data={data}/>
          <FolderDetails folderCount="10" fileCount="2"/>
        </div>
      </RfmProvider>
    )
  }
}
