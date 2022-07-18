import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme 

import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    

import { BrowserRouter } from 'react-router-dom';
import App from "./components/App/App"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
      <App/>
   </BrowserRouter>
  </React.StrictMode>
);


