import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Profile from "./components/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </BrowserRouter>
  );
}

function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/signin">Signin</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
}
