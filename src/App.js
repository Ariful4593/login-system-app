import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
function App() {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  return (
    <Router>
      {
        loggedInUser && <Dashboard />
      }
      <Switch>
        <PrivateRoute exact path="/">
          {
            loggedInUser ? '' : <Dashboard />
          }
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
