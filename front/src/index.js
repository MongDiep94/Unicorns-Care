import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Components/Footer/Footer.js';
import ScrollToTop from './Components/ScrollToTop.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
