import React, { useState, useLayoutEffect } from "react";
import dateFormat from "dateformat";
import { Link, useHistory, useLocation } from "react-router-dom";

import { useUserContext } from "../context/UserContext";
import { getEntries } from "../api/entriesApi";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import useStyles from "../styles/entriesStyles";
import { strip } from "../utils/utils";

export default function Entries(props) {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  var date = location.search.slice(1);
  var displayDate;
  const { rootRoute } = props;

  try {
    date = decodeURI(date);
    displayDate = dateFormat(date, "dddd dd mmmm yyyy");
  } catch (err) {
    console.log("date format incorrect");
  }

  const userContext = useUserContext();
  const [entries, setEntries] = useState([]);
  const classes = useStyles();

  useLayoutEffect(() => {
    console.log("use effect entries");
    async function loadEntries() {
      setLoading(true);
      console.log("retrieving for date: ", date);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      const entries = await getEntries(userContext.user, date);

      if (mounted) {
        setEntries(entries);
        setLoading(false);
      }
    }
    let mounted = true;

    loadEntries();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      {console.log("entries root")}

      <div className={classes.headerContainer}>
        <h1 className={classes.title}>
          <em>
            <i>{displayDate}</i>
          </em>
        </h1>
        <Link
          to={{
            pathname: `${rootRoute}/entries/create-entry`,
            new: true,
            search: date,
          }}
        >
          <Button variant="dark">create new entry</Button>
        </Link>{" "}
      </div>

      {loading ? (
        <div className={classes.spinnerContainer}>
          {" "}
          <Spinner animation="border" className={classes.spinner} role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : entries.length > 0 ? (
        entries.map((entry, id) => (
          <Card key={id} className={classes.card}>
            <Card.Body>
              <Card.Title>{entry.title} </Card.Title>
              <Card.Text className={classes.cardText}>
                {strip(entry.data)}
              </Card.Text>
              <div className={classes.linkContainer}>
                <Button
                  variant="dark"
                  onClick={() => {
                    history.push({
                      pathname: `${rootRoute}/entries/display-entry`,
                      entry: entry,
                      search: `${entry._id}`,
                      // search: `testentry`,
                    });
                  }}
                >
                  {" "}
                  go to entry
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className={classes.noEntriesMessageContainer}>
          <h1>No entries made on this date</h1>
        </div>
      )}
    </Container>
  );
}
