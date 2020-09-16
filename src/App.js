import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import Routes from './routes/index';
import history from './services/history';
import GlobalStyle from './styles/GlobalStyles';

function App() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
     return   <BrowserRouter history={history}>
                  <Routes />
                  <GlobalStyle />
              </BrowserRouter>
  } else {
      return  <HashRouter history={history}>
                  <Routes />
                  <GlobalStyle />
              </HashRouter>
  }
}

export default App;
