import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Ethers from './Context/EthersContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Searcher from './Context/SearchContext';
import "@biconomy/web3-auth/dist/src/style.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Searcher>
    <Ethers><App /></Ethers>
    </Searcher>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
