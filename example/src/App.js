import React, { Component } from 'react'

import  RFM  from 'react-file-manager-rfm'
import 'react-file-manager-rfm/dist/index.css'


export default class App extends Component{
  render(){
    const dataArray = [
      {
        id:1,
        itemName:"klasör1",
        type:"folder",
      },
      {
        id:2,
        itemName:"klasör1",
        type:"folder",
      },
      {
        id:3,
        itemName:"abc.txt",
        type:"file", 
      }
    ]

    return(
      <div>
        <RFM 
          data={dataArray}
        />
      </div>
    )
  }
}