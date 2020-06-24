import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InitialState } from './utils/types';
import configureStore from './store';

export const initialState: InitialState = {
  golyaLista: [
    {
        id: 1,
        nev: "Kis Istvan",
        email: "kis.istvan@gmail.com",
        szak: "tv"
    },
    {
        id: 2,
        nev: "Nagy Peter",
        email: "nagy.peter@gmail.com",
        szak: "gm"
    },
    {
        id: 3,
        nev: "Kovacs Erzsi",
        email: "kovacs.erszi@gmail.com",
        szak: "ginf"
    }
  ],
  filteredGolyaLista: [
    {
        id: 1,
        nev: "Kis Istvan",
        email: "kis.istvan@gmail.com",
        szak: "tv"
    },
    {
        id: 2,
        nev: "Nagy Peter",
        email: "nagy.peter@gmail.com",
        szak: "gm"
    },
    {
        id: 3,
        nev: "Kovacs Erzsi",
        email: "kovacs.erszi@gmail.com",
        szak: "ginf"
    }
  ],
  filters: {
    minId: -1,
    maxId: -1,
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
