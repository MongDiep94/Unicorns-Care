import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop.js';
import App from './App.js';
import Footer from './Components/Footer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename = '/'>
      <ScrollToTop />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
