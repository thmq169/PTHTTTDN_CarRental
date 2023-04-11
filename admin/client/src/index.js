import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { StoreProvider, AuthProvider } from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';

document.title = 'Hiring Car - Admin'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>
);
