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
import PropTypes from 'prop-types'
import { SET_RECYCLE_BIN } from './context/functions';
const allEnhancers = compose( 
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = createStore(reducer, initialState, allEnhancers)
const RFM = (props) =>{
    const _location = props.location;
    const _isItRecycleBin = props.isItRecycleBin;
    store.dispatch(SET_RECYCLE_BIN(_isItRecycleBin))
    return(
      <Provider store={store}>
        <RFM_Core
          location={_location}
          username="main"
          password="qweqweasd"
        />
      </Provider>
    )
  }
export default RFM;

RFM.PropTypes = {
  location       : PropTypes.string,
  isItRecycleBin : PropTypes.bool
}