import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { InitialState } from './utils/types';
import configureStore from './State/store';

export const initialState: InitialState = {
  preview: true,
  time: "before",
  result: null,
  startTime: new Date("2020-07-27T12:00:00"),
  endTime: new Date("2020-08-10T23:59:59")
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
