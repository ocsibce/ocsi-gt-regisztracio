import React from 'react';
import PreviewBar from './PreviewBar';
import { useSelector } from 'react-redux';
import { InitialState } from './utils/types';
import Registration from './Registration/Registration';
import Closed from './Closed';
import Countdown from './Countdown';

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
      {mainView}
    </div>
  );
}

export default App;
