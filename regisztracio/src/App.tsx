import React from 'react';
import PreviewBar from './Components/PreviewBar';
import { useSelector } from 'react-redux';
import { InitialState } from './utils/types';
import Registration from './Components/Registration/Registration';
import Closed from './Components/Closed';
import Countdown from './Components/Countdown';
import Hero from './Components/Hero';

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
    <div>
      {showPreview ? <PreviewBar /> : <></>}
      <main>
        <Hero heroStyle={showView === "during" ? "big" : "small"} />
        {mainView}
      </main>
    </div>
  );
}

export default App;
