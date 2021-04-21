import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { useUserContext } from "../context/UserContext";
import dateFormat from "dateformat";
import { useLocation, useHistory } from "react-router";
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
    console.log("try block, date: " + date);
    date = decodeURI(date);
    console.log("decoded uri:" + date);
    displayDate = dateFormat(date, "dddd dd mmmm yyyy");
    console.log("formatted date: " + date);
  } catch (err) {
    console.log(location.search.slice(1));
    console.log(err);
  }

  const handleSubmit = async (data) => {
    const entryData = { date, username, title, data };
    async function saveEntryWrapper(entryData) {
      console.log("data " + entryData);
      const res = await saveEntry(entryData);
      if (res.status === 200) {
        setSuccessMessage(true);
        setTimeout(() => history.push("/"), 1000);
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
          <h1>{displayDate}</h1>
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
