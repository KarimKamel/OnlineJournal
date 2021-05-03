import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import Middleware from "./components/Middleware";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import Profile from "./components/Profile";
import NavComp from "./components/NavComp";
import Journal from "./components/Journal";

import Calendar from "./components/Calendar";
import { useUserContext } from "./context/UserContext";
import { makeStyles } from "@material-ui/styles";
import AllEntries from "./components/AllEntries";
import NewEntry from "./components/NewEntry";

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
      {console.log(process.env.NODE_ENV)}
      {console.log("#####################")}

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
                    pathname: "/",
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
            <Route path="/allentries">
              {userContext.user ? (
                <AllEntries />
              ) : (
                <Redirect
                  to={{
                    pathname: "/signin",
                  }}
                />
              )}
            </Route>
            <Route path="/Calendar">
              <Calendar />
            </Route>
            <Route path="/journal">
              {userContext.user ? (
                <Journal />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )}
            </Route>
            <Route path="/entries/create-entry">
              {userContext.user ? (
                <NewEntry />
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
