/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { css } from 'glamor';
import 'glamor-reset';

css.insert(`
  body, html {
    height: 100vh;
    font-size: 16px;
    color: #666;
    -webkit-font-smoothing: antialiased;
  }
`);

css.insert(`
  A {
    text-decoration: none;
  }
`);

css.insert(`
  * {
    min-width: 0;
    min-height: 0;
    box-sizing: border-box;
  }
`);

css.insert(`
  #root {
    min-height: 100%; /* not 100 vh because of mobile chrome */
    display: flex;
  }
`);

const mountNode = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountNode
);

if (module.hot) {
  ((module.hot: any): {
    accept: (a: string, b: () => void) => void,
  }).accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(
      <BrowserRouter>
        <NextApp />
      </BrowserRouter>,
      mountNode
    );
  });
}
