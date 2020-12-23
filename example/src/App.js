import React from 'react';
import  RFM  from 'react-file-manager-rfm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './context/reducer';
import { initialState } from './context/store';
import 'react-file-manager-rfm/dist/index.css';

const store = createStore(reducer, initialState)
const App = () =>{
    return(
      <Provider store={store}>
        <RFM 
          location="/home/main/drive"
          showHiddenFiles="no"
        />
      </Provider>
    )
  }
export default App;