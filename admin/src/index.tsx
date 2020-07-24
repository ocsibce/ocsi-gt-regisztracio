import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InitialState } from './utils/types';
import configureStore from './State/store';

export const initialState: InitialState = {
  golyaLista: [],
  filteredGolyaLista: [],
  filters: {
    minId: 0,
    maxId: 0,
    nev: "",
    hetfo: false,
    kedd: false,
    szerda: false,
    csutortok: false,
    pentek: false,
    szak: [],
    regDateKezdo: 0,
    regDateUtolso: 0,
  },
  settings: [],
  savingSettings: false
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
