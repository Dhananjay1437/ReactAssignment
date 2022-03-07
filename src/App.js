import "./App.css";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import FormData from "./pages/FormData";
import { useDispatch, useSelector } from "react-redux";
import ListView from "./pages/ListView";
function App() {
  const userLogInData = useSelector((state) => state.userLogInData.userData);
  let userLogIn = () => {
    let x_access_token = null;
    if (userLogInData) {
      x_access_token = userLogInData.token;
    } else {
      x_access_token = sessionStorage.getItem("x_access_token");
    }

    let token = x_access_token;
    if (!token) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          {userLogIn() ? (
            <>
              <Route path="/dashboard" exact component={FormData}></Route>
              <Route path="/list-view" exact component={ListView}></Route>
            </>
          ) : (
            <Redirect to="/" />
          )}

          <Route path="*" exact={true} component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
