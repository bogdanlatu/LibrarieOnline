import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './app/App';
import AuthProvider from './Context/AuthContext';

ReactDOM.render(
<AuthProvider>
    <App />
</AuthProvider>,

  document.getElementById('root')
);

