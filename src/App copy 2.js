import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { CSSTransition } from "react-transition-group";

import Middleware from "./components/Middleware";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Profile from "./components/Profile";
import NavComp from "./components/NavComp";
import Entries from "./components/Entries";
import Calendar from "./components/Calendar copy";
import { useUserContext } from "./context/UserContext";
import { makeStyles } from "@material-ui/styles";
import { Container, Navbar } from "react-bootstrap";
import classNames from "classnames";

const useStyles = makeStyles({
  loadingEnter: {
    display: "flex",
    justifyContent: "center",
    opacity: 1,
    transition: "opacity 2s",

    "& h1": {
      paddingTop: "2rem",
    },
  },
  loadingExit: {
    opacity: 0,
  },
  pulse: {
    animation: "$pulse 5s infinite",
  },
  "@keyframes pulse": {
    "0%": {
      // Color: "#001F3F",
      color: "#001F3F",
    },
    "50%": {
      // Color: "#FF4136",
      color: "#FF4136",
    },
    "100%": {
      // Color: "#FF4136",
      color: "#001F3F",
    },
  },
});
// const useStyles = makeStyles({
//   loadingContainerShow: {
//     display: "flex",
//     justifyContent: "center",
//     opacity: 1,
//     transition: "opacity 2s",

//     "& h1": {
//       paddingTop: "2rem",
//     },
//   },
//   loadingContainerHide: {
//     opacity: 0,
//   },
//   pulse: {
//     animation: "$pulse 5s infinite",
//   },
//   "@keyframes pulse": {
//     "0%": {
//       // Color: "#001F3F",
//       color: "#001F3F",
//     },
//     "50%": {
//       // Color: "#FF4136",
//       color: "#FF4136",
//     },
//     "100%": {
//       // Color: "#FF4136",
//       color: "#001F3F",
//     },
//   },
// });
export default function App() {
  const userContext = useUserContext();
  const classes = useStyles();
  const class1 = classes.loadingContainerShow;
  const class2 = classes.loadingContainerHide;
  var loadingClass = classNames({
    "alert-enter-active": true,
    "alert-exit-active": !userContext.loading,
  });
  var loading2Class = classNames({
    [classes.loadingContainerShow]: true,
    [classes.pulse]: true,
    [classes.loadingContainerHide]: !userContext.loading,
  });
  var contentClass = classNames({
    "alert-enter": true,
    "alert-enter-active": !userContext.loading,
  });
  return (
    <BrowserRouter>
      {console.log("rendering APP")}
      {console.log("user is set to:" + userContext.user)}
      {/* {(userContext.loading = true)} */}
      <Middleware />
      {/* {(userContext.loading = false)} */}

      <NavComp />
      <CSSTransition
        in={userContext.loading}
        timeout={200}
        classNames={[classes.loading]}
      >
        <div>
          <h1 className={classes.loadingText}>Loading...</h1>
        </div>
      </CSSTransition>

      <div>
        {/* <div className={loading2Class}>
          <h1 className={classes.loadingText}>Loading...</h1>
        </div> */}
        <div className={contentClass}>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/signin">
            <Signin />
          </PrivateRoute>

          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/Calendar">
            <Calendar />
          </Route>
          <Route path="/signout">
            <Signout />
          </Route>
        </div>
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
