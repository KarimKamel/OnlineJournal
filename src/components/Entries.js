import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import {
  Link,
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import DisplayEntry from "./DisplayEntry";
import NewEntry from "./NewEntry";
import { useUserContext } from "../context/UserContext";
import { getEntries } from "../api/entriesApi";
import { Card, Button, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  title: { marginTop: "2rem" },
  linkContainer: { textAlign: "end" },
  card: { marginTop: "2rem" },
});

function strip(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default function Entries(props) {
  const { path, url, isExact } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  var date = location.search.slice(1);
  var displayDate;

  try {
    console.log("date received as: " + date);
    date = decodeURI(date);
    console.log("date decoded to: " + date);
    displayDate = dateFormat(date, "dddd dd mmmm yyyy");
    console.log("display date formatted as: " + displayDate);
  } catch (err) {
    console.log("date format incorrect");
  }

  // const { date } = location.date;

  const userContext = useUserContext();
  const [entries, setEntries] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    console.log("use effect entries");
    async function loadEntries() {
      setLoading(true);

      const entries = await getEntries(userContext.user, date);
      setLoading(false);

      setEntries(entries);
    }
    if (isExact) {
      console.log("loading entries");
      try {
        loadEntries();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // const date = new Date();

  return (
    <Switch>
      <Route path={`${path}/display-entry`}>
        <DisplayEntry />
      </Route>
      <Route path={`${path}/create-entry`}>
        <NewEntry />
      </Route>

      <Route path={`${path}`}>
        <Container>
          {console.log("entries root")}
          {isExact && (
            <h1 className={classes.title}>entries created on {displayDate}</h1>
          )}
          <Link
            to={{
              pathname: `${path}/create-entry`,
              new: true,
              search: date,
            }}
          >
            <Button variant="primary">create new entry</Button>
          </Link>{" "}
          {loading ? (
            <h1>loading entries</h1>
          ) : (
            entries.map((entry, id) => (
              <Card key={id} className={classes.card}>
                <Card.Body>
                  <Card.Title>{entry.title} </Card.Title>
                  <Card.Text>{strip(entry.data)}</Card.Text>
                  <div className={classes.linkContainer}>
                    <button
                      onClick={() => {
                        history.push({
                          pathname: `${path}/display-entry`,
                          entry: entry,
                          search: `${entry._id}`,
                          // search: `testentry`,
                        });
                      }}
                    >
                      {" "}
                      go to post
                    </button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Container>
      </Route>
    </Switch>
  );
}
