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

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://teszt.api.bceocsi.com/golya/read.php').then((response: AxiosResponse) => {
      console.log(response.data.records)
      dispatch(golyaRequest(response.data.records))
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
