import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "tailwindcss/tailwind.css";


ReactDOM.render(
  <React.StrictMode>
    <div style={{ overflowX: "hidden" }}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

