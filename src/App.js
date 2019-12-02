import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import GlobalStyles from './styles/global';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
      </Router>
    </Provider>
  );
}
