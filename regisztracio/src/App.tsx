import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getCookie } from 'react-use-cookie';
import PreviewBar from './Components/PreviewBar';
import { useSelector, useDispatch } from 'react-redux';
import { InitialState, Time } from './utils/types';
import Registration from './Components/Registration/Registration';
import Closed from './Components/Closed';
import Countdown from './Components/Countdown';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Spinner from './Components/Spinner';
import LanguageChanger from './Components/LanguageChanger';
import ocsiApi from './API/ocsiApi';

import { dataFromApi, setPreview, requestSent } from './State/actions';
import { AxiosError } from 'axios';
import { initialState } from '.';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Main = styled.main`
  flex: 1 0 auto;
  position: relative;
`;

function App() {

  const {loading, showPreview, showView} = useSelector((state: InitialState) => ({
    loading: state.loading,
    showPreview: state.preview,
    showView: state.time
  }));

  const dispatch = useDispatch();
  const ocsiAuthToken = getCookie('ocsi-auth-token');

  useEffect(() => {
    const authArray = ocsiAuthToken.split('.');
    if (authArray.length === 3) {
      dispatch(setPreview(true));
    } else {
      dispatch(setPreview(false));
    }
  }, [ocsiAuthToken]);

  useEffect(() => {
    const url = `/settings/readOne.php?${showPreview ? 'preview' : 'eles'}=1`;

    let config = undefined;

    if (showPreview) {
      config = {
        headers: {
          'X-OCSI-AUTHORIZATION': `Bearer ${ocsiAuthToken}`,
        }
      };
    }

    ocsiApi.get(url, config).then(({data}) => {
      const startTime = data.start_date;
      const endTime = data.end_date;
      const details = JSON.parse(data.reszletek);
      const detailsEn = JSON.parse(data.reszletek_en);
      const szakok = JSON.parse(data.szakok);
      const szakokEn = JSON.parse(data.szakok_en);
      const adatkezeles = JSON.parse(data.adatkezeles);
      const adatkezelesEn = JSON.parse(data.adatkezeles_en);
      const hazirend = JSON.parse(data.hazirend);
      const hazirendEn = JSON.parse(data.hazirend_en);
      const bannerLink = data.banner_link;

      let time: Time | null = null;
      const currentTime = new Date(Date.now());
      if (new Date(startTime) > currentTime) {
        time = "before";
      } else if (new Date(endTime) < currentTime) {
        time = "after";
      } else {
        time = "during"
      }

      const settingsState = {
        startTime,
        endTime,
        time,
        details,
        detailsEn,
        szakok,
        szakokEn,
        adatkezeles,
        adatkezelesEn,
        hazirend,
        hazirendEn,
        bannerLink,
        loading: false,
      }
      dispatch(dataFromApi(settingsState));
    }).catch((err: AxiosError) => {
      dispatch(dataFromApi(initialState));
      console.log(err);
    })
  }, [showPreview]);

  let mainView = null;

  if (loading) {
    mainView = <Spinner />
  } else {
    switch (showView) {
      case "after":
        mainView = <Closed />
        break;
      case "during":
        mainView = <Registration />
        break;
      case "before":
        mainView = <Countdown />
    }
  }

  return (
    <AppContainer>
      <Main>
        {showPreview ? <PreviewBar /> : <></>}
          <LanguageChanger />
          <Hero heroStyle={showView === "during" ? "big" : "small"} />
          {mainView}
      </Main>
      <Footer />
    </AppContainer>
  );
}

export default App;
