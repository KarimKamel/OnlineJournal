import React, { useState, useLayoutEffect } from "react";
import { getEntries, getNumberOfEntries } from "../api/entriesApi";
import { useUserContext } from "../context/UserContext";
import { Card, Spinner, Container, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import dateFormat from "dateformat";
import PaginationComponent from "./PaginationComponent";
import { divideEntriesByDate, strip } from "../utils/utils";
import useStyles from "../styles/allEntriesStyles";

export default function AllEntries(props) {
  const [entriesByDate, setEntriesByDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const userContext = useUserContext();
  const classes = useStyles();
  const history = useHistory();
  const [numberOfEntries, setNumberOfEntries] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const { rootRoute } = props;

  useLayoutEffect(() => {
    setLoading(true);

    async function getNumberOfEntriesWrapper(user) {
      const res = await getNumberOfEntries(user);
      if (mounted) setNumberOfEntries(res);
    }
    async function getEntriesWrapper(user, entriesPerPage, activePage) {
      const res = await getEntries(user, null, entriesPerPage, activePage);
      console.log(res);
      var entriesByDate = divideEntriesByDate(res);

      if (mounted) {
        setEntriesByDate(entriesByDate);
        setLoading(false);
      }
    }

    let mounted = true;
    getNumberOfEntriesWrapper(userContext.user);
    getEntriesWrapper(userContext.user, entriesPerPage, activePage);
    return () => {
      mounted = false;
    };
  }, [activePage]);

  return (
    <Container>
      {loading ? (
        <div className={classes.spinnerContainer}>
          {" "}
          <Spinner animation="border" className={classes.spinner} role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <div className={classes.paginationContainer}>
            <PaginationComponent
              pages={Math.ceil(numberOfEntries / entriesPerPage)}
              active={activePage}
              setActive={setActivePage}
            />
          </div>
          <Button
            className={classes.newEntryButton}
            variant="dark"
            onClick={() => history.push({ pathname: `Entries/create-entry` })}
          >
            add a new journal entry
          </Button>
          {entriesByDate.length > 0 ? (
            entriesByDate.map((obj, idx) => (
              <div key={idx}>
                <div className={classes.dateContainer}>
                  <h2>
                    {dateFormat(new Date(obj.date), "dddd, mmmm dS, yyyy")}
                  </h2>
                </div>

                {obj.entries.map((entry) => (
                  <Card key={entry._id} className={classes.card}>
                    <Card.Body>
                      <Card.Title>{entry.title}</Card.Title>
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
                          go to post
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ))
          ) : (
            <div>
              <div className={classes.noEntriesMessageContainer}>
                <h1>No journal entries have been made yet</h1>
              </div>
            </div>
          )}

          <div className={classes.paginationContainer}>
            <PaginationComponent
              pages={Math.ceil(numberOfEntries / entriesPerPage)}
              active={activePage}
              setActive={setActivePage}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
