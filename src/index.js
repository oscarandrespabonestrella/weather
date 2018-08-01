import React from 'react';
import { render } from 'react-dom'
import './styles/css/index.css';
import App from './App';
import { Provider } from "react-redux"
import configureStore from './store/configureStore';


const store = configureStore();

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
