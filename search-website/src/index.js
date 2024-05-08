import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/collapse'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

