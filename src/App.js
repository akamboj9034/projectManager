import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './Main';

// import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
    <div>
      {/* App Component Has a Child Component called Main*/}
      <Main/>
    </div>
  </BrowserRouter>
  );
}
export default App;
