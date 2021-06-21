import React from 'react'
import './App.css';

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Links from 'components/Links/Links'

function App() {

  return (
    <div className="container p-4">
      <h5 className="d-flex justify-content-center">Crud Links</h5>
      <div className="row">
        <Links/>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
