import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'antd/dist/reset.css';

import { Provider } from 'react-redux';
import { store } from './store/index.ts';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rules from './components/Rules/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<Rules />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
