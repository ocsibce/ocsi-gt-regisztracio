import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InitialState } from './utils/types';
import configureStore from './store';

const testGolyak = [
  {
      id: 100,
      nev: "Kis Istvan",
      email: "kis.istvan@gmail.com",
      szak: "tv",
      regisztralt: 1592396405469,
      napok: {
        hetfo: true,
        kedd: true,
        szerda: false,
        csutortok: false,
        pentek: false,
      }
  },
  {
      id: 434,
      nev: "Nagy Peter",
      email: "nagy.peter@gmail.com",
      szak: "gm",
      regisztralt: 1591796405469,
      napok: {
        hetfo: true,
        kedd: true,
        szerda: true,
        csutortok: true,
        pentek: true,
      }
  },
  {
      id: 500,
      nev: "Kovacs Erzsi",
      email: "kovacs.erzsi@gmail.com",
      szak: "ginf",
      regisztralt: 1590796405469,
      napok: {
        hetfo: false,
        kedd: false,
        szerda: false,
        csutortok: true,
        pentek: true,
      }
  },
  {
    id: 666,
    nev: "Szabo Nora",
    email: "szabo.nora@gmail.com",
    szak: "hr",
    regisztralt: 1591796405469,
    napok: {
      hetfo: false,
      kedd: false,
      szerda: true,
      csutortok: true,
      pentek: true,
    }
}
];

export const initialState: InitialState = {
  golyaLista: testGolyak,
  filteredGolyaLista: testGolyak,
  filters: {
    minId: 0,
    maxId: 0,
    nev: "",
    nap: {
      hetfo: false,
      kedd: false,
      szerda: false,
      csutortok: false,
      pentek: false
    },
    szak: [],
    regDateKezdo: 0,
    regDateUtolso: 0,
  }
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
