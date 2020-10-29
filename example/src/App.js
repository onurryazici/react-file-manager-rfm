import React, { Component } from 'react'

import  RFM  from 'react-file-manager-rfm'
import 'react-file-manager-rfm/dist/index.css'


export default class App extends Component{
  render(){
    const dataArray = [
      {
        itemName:"klasör1",
        type:"folder",
        extension:"n/a"
      },
      {
        itemName:"klasör1",
        type:"folder",
        extension:"n/a"
      },
      {
        itemName:"abc.txt",
        type:"file",
        extension:"txt"
      }
    ]

    return(
      <div>
        <RFM 
          text="Create React Library Example 😄" 
          rfmBackgroundColor="#dedede"
          data={dataArray}
        />
      </div>
    )
  }
}