import React, { useState, useLayoutEffect } from "react";
import { getEntries, getNumberOfEntries } from "../api/entriesApi";
import { useUserContext } from "../context/UserContext";
import { Card, Spinner, Container, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useRouteMatch } from "react-router-dom";
import dateFormat from "dateformat";
import PaginationComponent from "./PaginationComponent";

const useStyles = makeStyles({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
  },
  linkContainer: { textAlign: "end" },
  card: { marginBottom: "2rem" },
  cardText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  spinnerContainer: {
    display: "flex",
    paddingTop: "20vh",
    justifyContent: "center",
  },
  spinner: {
    width: "5rem",
    height: "5rem",
  },

  noEntriesMessageContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "4rem",
    border: "2px solid black",
    marginTop: "6rem",
    paddingBottom: "4rem",
    alignItems: "center",
    background: "lightsteelblue",
    borderRadius: "5px",
  },
  dateContainer: {
    backgroundColor: "black",
    color: "white",
  },
  newEntryButton: {
    display: "block",

    marginBottom: "2rem",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "2rem",
    paddingBottom: "2rem",

    "& .page-item .page-link": {
      color: "black",
    },
    "& .page-item.active .page-link": {
      backgroundColor: "black",
      borderColor: "black",
      color: "white",
    },
  },
});
function strip(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default function AllEntries() {
  const [entriesByDate, setEntriesByDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const userContext = useUserContext();
  const classes = useStyles();
  const { path, url, isExact } = useRouteMatch();
  const history = useHistory();
  const [numberOfEntries, setNumberOfEntries] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useLayoutEffect(() => {
    setLoading(true);

    async function getNumberOfEntriesWrapper(user) {
      const res = await getNumberOfEntries(user);
      setNumberOfEntries(res);
    }
    async function getEntriesWrapper(user, entriesPerPage, activePage) {
      const res = await getEntries(user, null, entriesPerPage, activePage);
      console.log(res);
      var dates = [];
      res.forEach((entry) => dates.push(entry.date));
      var dateSet = new Set(dates);
      // var entriesByDate = [{ date: "", entries: [{}] }];
      var entriesByDate = [];
      for (let date of dateSet) {
        entriesByDate.push({ date, entries: [] });
      }
      entriesByDate.forEach((obj) => {
        res.forEach((entry) => {
          if (obj.date === entry.date) {
            obj.entries.push(entry);
          }
        });
        obj.date = new Date(obj.date);
      });
      setEntriesByDate(entriesByDate);
      setLoading(false);
    }

    // setEntries(res);
    // setLoading(false);
    getNumberOfEntriesWrapper(userContext.user);
    getEntriesWrapper(userContext.user, entriesPerPage, activePage);
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
            entriesByDate.map((obj) => (
              <div>
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
                              pathname: `${path}/display-entry`,
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
