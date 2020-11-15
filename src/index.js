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
    data: PropTypes.array
  }
  render() {
    const { data } = this.props;

    return (
      <RfmProvider>
        
        <div className={styles.container}>
          <RfmConsumer>
            {
              value=>{
                  const {dispatch} = value;
                  return dispatch({type:"SET_DATA",payload:[data]});
              }
            }
          </RfmConsumer>
          <Actionbar/>
          <Placemap/>
          <Content data={data}/>
          <FolderDetails folderCount="10" fileCount="2"/>
        </div>
      </RfmProvider>
    )
  }
}
