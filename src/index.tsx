import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './component/app';
import { Provider } from 'react-redux';
import store from './helper/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
