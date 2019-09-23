import React from 'react';
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CookiesProvider } from 'react-cookie';
import AppNavbar from './containers/AppNavbar';
import Main from './containers/Main';

function App() {
  return (
    <CookiesProvider>
        <AppNavbar />
        <Main />
    </CookiesProvider>
  );
}

export default App;
