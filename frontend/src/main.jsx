import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import studentContext from './context/studentContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <studentContext>
    <App />
  </studentContext>
);
