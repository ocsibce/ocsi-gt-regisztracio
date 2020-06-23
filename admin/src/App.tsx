import React from 'react';
import { BrowserRouter as Router,
         Switch,
         Route
} from 'react-router-dom';
import AdminNavbar from './Navbar';
import Golyak from './GolyaPage/Golyak';

function App() {
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
