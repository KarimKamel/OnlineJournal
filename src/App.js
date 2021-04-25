import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

import Middleware from "./components/Middleware";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Profile from "./components/Profile";
import NavComp from "./components/NavComp";
import Entries from "./components/Entries";
import Calendar from "./components/Calendar";
import { useUserContext } from "./context/UserContext";
import { makeStyles } from "@material-ui/styles";
import { Container, Navbar } from "react-bootstrap";

const useStyles = makeStyles({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",

    "& h1": {
      paddingTop: "2rem",
    },
  },
});
export default function App() {
  const userContext = useUserContext();
  const classes = useStyles();

  return (
    <BrowserRouter>
      {console.log("rendering APP")}
      <Middleware />
      <div>
        {userContext.loading ? (
          <div className={classes.loadingContainer}>
            {console.log("display loading")}
            <h1 className={classes.loadingText}>Loading...</h1>
          </div>
        ) : (
          <div>
            {console.log("remove loading")}
            <NavComp />

            <Route exact path="/">
              <Home />
            </Route>

            {/* <PrivateRoute path="/signin">
              <Signin />
            </PrivateRoute> */}
            <Route path="/signin">
              {!userContext.user ? (
                <Signin />
              ) : (
                <Redirect
                  to={{
                    pathname: "/profile",
                  }}
                />
              )}
            </Route>

            <Route path="/profile">
              {userContext.user ? (
                <Profile />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )}
            </Route>
            <Route path="/signup">
              {!userContext.user ? (
                <Signup />
              ) : (
                <Redirect
                  to={{
                    pathname: "/profile",
                  }}
                />
              )}
            </Route>
            <Route path="/Calendar">
              <Calendar />
            </Route>
            <Route path="/signout">
              {userContext.user ? (
                <Signout />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )}
            </Route>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}
function PrivateRoute({ children, ...rest }) {
  let auth = useUserContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
