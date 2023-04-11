import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';

document.title = 'Hiring Car - Car Ower'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
