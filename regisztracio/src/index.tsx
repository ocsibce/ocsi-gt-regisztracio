import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { InitialState } from './utils/types';
import configureStore from './State/store';

export const initialState: InitialState = {
  preview: true,
  time: "during",
  result: null,
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
