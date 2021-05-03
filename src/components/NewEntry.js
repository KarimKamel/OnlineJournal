import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { useUserContext } from "../context/UserContext";
import dateFormat from "dateformat";
import { useLocation, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import { getEntry, updateEntry, saveEntry } from "../api/entriesApi";

const useStyles = makeStyles({
  root: {
    paddingTop: "2rem",
  },
  inputLabel: {
    fontSize: "2rem",
    marginTop: "2rem",
    display: "block",
  },
  inputTitle: {
    width: "100%",
    marginBottom: "2rem",
  },
  message: {
    textAlign: "center",
  },
});

export default function NewEntry(props) {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const userContext = useUserContext();
  const username = userContext.user;
  const classes = useStyles();
  var date = location.search.slice(1);

  var displayDate;
  try {
    if (!date) {
      date = new Date();
    }
    date = decodeURI(date);
    displayDate = dateFormat(date, "dddd dd mmmm yyyy");
  } catch (err) {
    console.log(location.search.slice(1));
    console.log(err);
  }

  const handleSubmit = async (data) => {
    const createdAt = new Date();
    const timezoneOffset = createdAt.getTimezoneOffset();

    const entryData = {
      date,
      username,
      title,
      data,
      createdAt,
      timezoneOffset,
    };
    async function saveEntryWrapper(entryData) {
      const res = await saveEntry(entryData);
      if (res.status === 200) {
        setSuccessMessage(true);
        setTimeout(() => history.goBack(), 1000);
      }
    }
    saveEntryWrapper(entryData);
  };

  return (
    <Container className={classes.root}>
      {successMessage ? (
        <h1 className={classes.message}>Post successfull</h1>
      ) : (
        <div>
          {console.log(location.search.slice(1))}
          {console.log(date)}
          <h1>
            {displayDate}
            <span style={{ fontSize: "1.2rem" }}>
              <Link to="/Calendar"> pick a different date</Link>
            </span>
          </h1>
          <h3>Create a new Entry</h3>
          <label htmlFor="titleInput" className={classes.inputLabel}>
            title
          </label>
          <input
            id="titleInput"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={classes.inputTitle}
          ></input>
          <Editor
            handleSubmit={handleSubmit}
            data={data}
            setData={(data) => setData(data)}
          />
          <Button
            variant="dark mt-2"
            className={classes.buttonSave}
            onClick={() => handleSubmit(data)}
          >
            save new entry
          </Button>
        </div>
      )}
    </Container>
  );
}
