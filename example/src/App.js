import React from 'react';
import  RFM  from 'react-file-manager-rfm';
import 'react-file-manager-rfm/dist/index.css';

const App = () =>{
    return(
        <RFM 
          location="/home/main/Desktop/react-file-manager-rfm-api/node_modules"
          isItRecycleBin={false}
        />
    )
  }
export default App;