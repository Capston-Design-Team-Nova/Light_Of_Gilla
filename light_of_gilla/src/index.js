import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//div.루트 엘리먼트에 렌더링
  //<React.StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>
  //</React.StrictMode>
);


reportWebVitals();
