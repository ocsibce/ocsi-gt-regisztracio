import React from 'react';
import styled from 'styled-components';
import PreviewBar from './Components/PreviewBar';
import { useSelector } from 'react-redux';
import { InitialState } from './utils/types';
import Registration from './Components/Registration/Registration';
import Closed from './Components/Closed';
import Countdown from './Components/Countdown';
import Hero from './Components/Hero';
import Footer from './Components/Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1 0 auto;
`;

function App() {

  const showPreview = useSelector((state: InitialState) => {return state.preview});
  const showView = useSelector((state: InitialState) => {return state.time});

  let mainView = null

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

  return (
    <AppContainer>
      <Main>
        {showPreview ? <PreviewBar /> : <></>}
          <Hero heroStyle={showView === "during" ? "big" : "small"} />
          {mainView}
      </Main>
      <Footer />
    </AppContainer>
  );
}

export default App;
