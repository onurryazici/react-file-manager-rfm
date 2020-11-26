import React, { Component } from 'react'

import  RFM  from 'react-file-manager-rfm'
import 'react-file-manager-rfm/dist/index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './context/reducer'
import { initialState } from './context/store'
const store = createStore(reducer, initialState)
const App = () =>{
    return(
      <Provider store={store}>
        <RFM 
          location="~/"
        />
      </Provider>
    )
  }
export default App;