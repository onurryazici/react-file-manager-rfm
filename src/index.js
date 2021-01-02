import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import RFM_Core from './core';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './context/reducer';
import { initialState } from './context/store';

const store = createStore(reducer, initialState)
const RFM = (props) =>{
    return(
      <Provider store={store}>
        <RFM_Core
          location={props.location}
        />
      </Provider>
    )
  }
export default RFM;

