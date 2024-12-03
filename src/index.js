import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 introduced this for better support of concurrent rendering
import './index.css'; // Optional: Include this if you have a global CSS file
import App from './App'; // Import the App component

// Create the root element and render the App component inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
