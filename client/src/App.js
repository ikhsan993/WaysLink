
import {useContext, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import { UserContext } from "./context/userContext";
import {API} from './config/api'

import AddLink from './pages/AddLink';
import Links from './pages/Links';
import LandingPage from './pages/LandingPage';
import DetailLink from './pages/DetailLink';
import EditLink from './pages/EditLink';
import Home from './pages/Home'
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

export default function App() {
let api = API();
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (state.isLogin == false) {
      history.push('/');
    } else {
        history.push("/home");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return ( 
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/add-link" component={AddLink} />
      <PrivateRoute path="/links" component={Links} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/detail-link/:id" component={DetailLink} />
      <PrivateRoute path="/edit-link/:id" component={EditLink} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}