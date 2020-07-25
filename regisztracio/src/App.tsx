import React, { useEffect } from 'react';
import styled from 'styled-components';
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

import MockData from './mockState.json';
import { dataFromApi } from './State/actions';

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

function App(props: any) {

  const {loading, showPreview, showView} = useSelector((state: InitialState) => ({
    loading: state.loading,
    showPreview: state.preview,
    showView: state.time
  }));

  const dispatch = useDispatch();

  // TODO real api call here
  useEffect(() => {
    setTimeout(() => {
      let time: Time | null = null;
      const currentTime = new Date(Date.now());
      if (new Date(MockData.startTime) > currentTime) {
        time = "before";
      } else if (new Date(MockData.endTime) < currentTime) {
        time = "after";
      } else {
        time = "during"
      }

      dispatch(dataFromApi({
        startTime: MockData.startTime,
        endTime: MockData.endTime,
        time,
        details: MockData.details,
        detailsEn: MockData.detailsEn,
        szakok: MockData.szakok,
        szakokEn: MockData.szakokEn
      }))
    }, 20);
  }, []);

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
