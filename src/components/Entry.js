import React, { useState, useEffect } from "react";
import Editor from "./Editor";

import { useLocation } from "react-router";
import { Button, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import { getEntry, updateEntry } from "../api/entriesApi";
const useStyles = makeStyles({
  root: {
    paddingTop: "2rem",
  },
  title: {
    marginBottom: "2rem",
  },
  buttonSave: {
    marginTop: "2rem",
  },
});

export default function Entry(props) {
  const location = useLocation();
  const [entry, setEntry] = useState(location.entry);
  const [data, setData] = useState(location.entry && location.entry.data);
  const classes = useStyles();

  useEffect(() => {
    async function getEntryWrapper() {
      const entryId = location.search.slice(1);
      const res = await getEntry(entryId);
      console.log("entry res " + res);
      setEntry(res);
      setData(res.data);
    }
    if (!entry) {
      console.log("noEntry");
      getEntryWrapper();
    }
  }, []);

  const handleSubmit = async () => {
    async function updateEntryWrapper(updateData) {
      const { entryId, data } = updateData;
      console.log("id " + entryId);
      console.log("data " + data);
      const res = await updateEntry(updateData);
      console.log(res);
    }
    updateEntryWrapper({ data, entryId: entry._id });
  };

  return (
    <Container className={classes.root}>
      {" "}
      {entry && (
        <div>
          <h3 className={classes.title}>{entry.title}</h3>
          <Editor handleSubmit={handleSubmit} data={data} setData={setData} />
          <Button className={classes.buttonSave} onClick={() => handleSubmit()}>
            update Entry{" "}
          </Button>
        </div>
      )}
    </Container>
  );
}
