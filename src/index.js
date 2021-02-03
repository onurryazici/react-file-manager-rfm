import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import RFM_Core from './core';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './context/reducer';
import { initialState } from './context/store';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'redux';
const allEnhancers = compose( 
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = createStore(reducer, initialState, allEnhancers)
const RFM = (props) =>{
    return(
      <Provider store={store}>
        <RFM_Core
          location="/home/main"
          username="main"
          password="qweqweasd"
        />
      </Provider>
    )
  }
export default RFM;