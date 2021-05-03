import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import { Container } from "react-bootstrap";
// import "./Calendar.css";
import "react-calendar/dist/Calendar.css";

import {
  useRouteMatch,
  useLocation,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Entries from "./Entries";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  calendar: {
    marginTop: "2rem",
    width: "100%",
    "& .react-calendar__tile--active": {
      background: "black",
    },
  },

  button: { border: " 5px solid gray" },
});

export default function Calendar() {
  const [date, onDateChange] = useState(new Date());
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  // const path = location.pathname;
  const classes = useStyles();

  return (
    <Switch>
      {console.log("rendering calendar")}
      <Route path={`${path}/Entries`}>
        <Entries />
      </Route>
      <Route path={`${path}`}>
        <Container>
          <ReactCalendar
            className={classes.calendar}
            onChange={onDateChange}
            value={date}
            onClickDay={(date) => {
              history.push({
                pathname: `${path}/Entries`,
                // search: `?query=${date}`,
                // search: `${dateFormat(date, "dd-mm-yyyy")}`,
                search: date.toString(),
              });
            }}
            // history.push(`${path}/Entries`)
          />
        </Container>

        {/* <Link to={`${url}/Entries`}>go to entries</Link>{" "} */}
      </Route>
    </Switch>
  );
}
