import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Middleware from "./components/Middleware";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import NavComp from "./components/NavComp";
import Journal from "./components/Journal";

import Calendar from "./components/Calendar";
import { useUserContext } from "./context/UserContext";
import { makeStyles } from "@material-ui/styles";
import AllEntries from "./components/AllEntries";
import NewEntry from "./components/NewEntry";
import DisplayEntry from "./components/DisplayEntry";
import FourOFour from "./components/FourOFour";

const useStyles = makeStyles({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",

    "& h1": {
      paddingTop: "2rem",
    },
  },
});
export default function App(props) {
  const userContext = useUserContext();
  const classes = useStyles();
  const rootRoute = "/OnlineJournal";

  return (
    <div>
      {console.log("rendering APP")}
      {console.log(process.env.NODE_ENV)}
      {console.log("#####################")}
      <Middleware />
      <div>
        {userContext.loading ? (
          <div className={classes.loadingContainer}>
            <h1 className={classes.loadingText}>Loading...</h1>
          </div>
        ) : (
          <div>
            <NavComp rootRoute={rootRoute} />
            <Switch>
              <Route exact path={`${rootRoute}/`}>
                <Home rootRoute={rootRoute} />
              </Route>

              <Route path={`${rootRoute}/signin`}>
                {!userContext.user ? (
                  <Signin />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/`,
                    }}
                  />
                )}
              </Route>

              <Route path={`${rootRoute}/profile`}>
                {userContext.user ? (
                  <Profile />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/`,
                    }}
                  />
                )}
              </Route>
              <Route path={`${rootRoute}/signup`}>
                {!userContext.user ? (
                  <Signup />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/profile`,
                    }}
                  />
                )}
              </Route>
              <Route path={`${rootRoute}/allentries`}>
                {userContext.user ? (
                  <AllEntries />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/signin`,
                    }}
                  />
                )}
              </Route>
              <Route path={`${rootRoute}/calendar`}>
                <Calendar />
              </Route>
              <Route path={`${rootRoute}/journal`}>
                {userContext.user ? (
                  <Journal />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/`,
                    }}
                  />
                )}
              </Route>
              <Route path={`${rootRoute}/entries/create-entry`}>
                {userContext.user ? (
                  <NewEntry />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/`,
                    }}
                  />
                )}
              </Route>
              <Route path={`${rootRoute}/entries/display-entry`}>
                {userContext.user ? (
                  <DisplayEntry />
                ) : (
                  <Redirect
                    to={{
                      pathname: `${rootRoute}/`,
                    }}
                  />
                )}
              </Route>
              <Route>
                <FourOFour />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </div>
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
