import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import RFM_Core from './core';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './context/reducer';
import { initialState } from './context/store';

const store = createStore(reducer, initialState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const RFM = (props) =>{
    return(
      <Provider store={store}>
        <RFM_Core
          location="/home"
          username="main"
          password="qweqweasd"
        />
      </Provider>
    )
  }
export default RFM;

