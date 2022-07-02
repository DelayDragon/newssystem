import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'antd/dist/antd.min.css'
// import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// reportWebVitals();
