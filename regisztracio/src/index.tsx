import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { InitialState } from './utils/types';
import configureStore from './State/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export const initialState: InitialState = {
  preview: true,
  time: "during",
  result: null,
  startTime: new Date("2020-07-27T12:00:00"),
  endTime: new Date("2020-08-10T23:59:59"),
  loading: true,
  details: {
    regisztracioMenete: [""],
    fontosInformaciok: [""]
  },
  detailsEn: {
    regisztracioMenete: [""],
    fontosInformaciok: [""]
  },
  szakok: null,
  szakokEn: null,
  language: 'hu'
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
