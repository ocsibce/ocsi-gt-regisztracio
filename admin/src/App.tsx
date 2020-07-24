import React, { useEffect } from 'react';
import { BrowserRouter as Router,
         Switch,
         Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios, {AxiosResponse} from 'axios';
import AdminNavbar from './Navbar';
import Golyak from './GolyaPage/Golyak';
import { golyaRequest } from './actions';
import { GolyaAdat } from './utils/types';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://teszt.api.bceocsi.com/golya/read.php').then((response: AxiosResponse) => {
      const golyaAdatok = response.data.records;
      const javitottGolyaAdatok = golyaAdatok.map((golya: any) => {
        golya.hetfo = golya.hetfo === "1";
        golya.kedd = golya.kedd === "1";
        golya.szerda = golya.szerda === "1";
        golya.csutortok = golya.csutortok === "1";
        golya.pentek = golya.pentek === "1";

        return golya;
      })
      dispatch(golyaRequest(javitottGolyaAdatok))
    })
  }, []);

  return (
    <Router>
      <AdminNavbar />
      <main className="pt-3">
        <Switch>
          <Route exact path="/">
            <h1>Main</h1>
          </Route>
          <Route path="/golyak">
            <Golyak />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
