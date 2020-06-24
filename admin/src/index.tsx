import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InitialState, GolyaAdat } from './utils/types';
import configureStore from './store';

const testGolyak: GolyaAdat[] = [
  {
      id: 100,
      nev: "Kis Istvan",
      email: "kis.istvan@gmail.com",
      szak: "tv",
      telefonszam: "0620666420",
      cim: "Nagyvaros, Fo utca 5",
      nem: "Férfi",
      oktatasiAzonosito: 56543345,
      szuletesDatum: "2000-01-02",
      szuletesHely: "Nagyvaros",
      poloMeret: "XL",
      napok: {
        hetfo: true,
        kedd: true,
        szerda: false,
        csutortok: false,
        pentek: false,
      },
      anyjaNeve: "Kis Anita",
      allergia: "Mindenre",
      etelerzekeny: "Laktoz, gluten",
      egyeb: "nincs",
      regisztralt: 1592396405469,
  },
  {
      id: 434,
      nev: "Nagy Peter",
      email: "nagy.peter@gmail.com",
      szak: "gm",
      telefonszam: "06204236469",
      cim: "Kisvaros, Fo ter 5",
      nem: "Férfi",
      oktatasiAzonosito: 56544345,
      szuletesDatum: "2000-05-02",
      szuletesHely: "Nagyvaros",
      poloMeret: "M",
      napok: {
        hetfo: true,
        kedd: true,
        szerda: true,
        csutortok: true,
        pentek: true,
      },
      anyjaNeve: "Nagy Rita",
      allergia: null,
      etelerzekeny: null,
      egyeb: null,
      regisztralt: 1591796405469,
  },
  {
      id: 500,
      nev: "Kovacs Erzsi",
      email: "kovacs.erzsi@gmail.com",
      szak: "ginf",
      telefonszam: "06204236469",
      cim: "Nagyfalu, Fo ter 5",
      nem: "Nő",
      oktatasiAzonosito: 56555345,
      szuletesDatum: "2000-02-02",
      szuletesHely: "Nagyvaros",
      poloMeret: "S",
      napok: {
        hetfo: false,
        kedd: false,
        szerda: false,
        csutortok: true,
        pentek: true,
      },
      anyjaNeve: "Kovacs Erzsebet",
      allergia: "novenyek",
      etelerzekeny: null,
      egyeb: null,
      regisztralt: 1590796405469,
  },
  {
    id: 666,
    nev: "Szabo Nora",
    email: "szabo.nora@gmail.com",
    szak: "hr",
    telefonszam: "06204236469",
    cim: "Kisfalu, Fo ter 5",
    nem: "Nő",
    oktatasiAzonosito: 56544345,
    szuletesDatum: "2000-06-02",
    szuletesHely: "Nagyvaros",
    poloMeret: "XS",
    napok: {
      hetfo: false,
      kedd: false,
      szerda: true,
      csutortok: true,
      pentek: true,
    },
    anyjaNeve: "Szabo Cecilia",
    allergia: null,
    etelerzekeny: null,
    egyeb: null,
    regisztralt: 1591796405469,
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
