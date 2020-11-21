import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reducers from './reducers/index.js';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import App from "./App";
import { HashRouter } from "react-router-dom";
import thunk from "redux-thunk";


const store = createStore(
    reducers,
    applyMiddleware(thunk),
);
window.store = store;
ReactDOM.render(
    <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),