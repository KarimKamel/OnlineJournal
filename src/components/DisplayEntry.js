import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useLocation, useHistory } from "react-router";
import { Card, Button, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import {
  getEntry,
  updateEntry,
  saveEntry,
  deleteEntry,
} from "../api/entriesApi";
const useStyles = makeStyles({
  root: {
    paddingTop: "2rem",
  },
  titleInput: {
    marginBottom: "2rem",
    width: "100%",
  },
  titleLabel: {
    fontSize: "2rem",
  },
  buttonSave: {
    marginTop: "2rem",
    marginRight: "1rem",
  },
  message: {
    textAlign: "center",
  },
});

export default function DisplayEntry(props) {
  const location = useLocation();
  const history = useHistory();
  const [entry, setEntry] = useState(location.entry);
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deletMessage, setDeleteMessage] = useState(false);
  const classes = useStyles();

  //   useEffect(() => {
  //     async function getEntryWrapper() {
  //       const entryId = location.search.slice(1);
  //       const res = await getEntry(entryId);
  //       console.log("entry res " + res);
  //       setEntry(res);
  //       setData(res.data);
  //     }
  //     if (!entry) {
  //       console.log("noEntry");
  //       getEntryWrapper();
  //     }
  //   }, []);
  useEffect(() => {
    async function getEntryWrapper() {
      if (!entry) {
        console.log("No entry");
        const entryId = location.search.slice(1);
        const res = await getEntry(entryId);
        console.log("entry res " + res);
        setEntry(res);
        setData(res.data);
        setTitle(res.title);
      } else if (!data) {
        console.log("No data");
        setData(entry.data);
        setTitle(entry.title);
      }
    }

    if (!entry || !data) {
      getEntryWrapper();
    }
  }, []);

  function displaySuccessMessage() {
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 1000);
  }
  function displayDeleteMessage() {
    setDeleteMessage(true);

    setTimeout(() => {
      setDeleteMessage(false);
      history.goBack();
    }, 1000);
  }

  const handleSubmit = async () => {
    async function updateEntryWrapper(updateData) {
      const { entryId, title, data } = updateData;
      console.log("id " + entryId);
      console.log("data " + data);
      console.log("title " + title);
      const res = await updateEntry(entryId, title, data);
      setEditMode(false);
      console.log(res);
      displaySuccessMessage();
    }
    updateEntryWrapper({ data, title, entryId: entry._id });
  };

  const handleDelete = async (event) => {
    const entryId = entry._id;
    const res = await deleteEntry(entryId);
    displayDeleteMessage();
  };

  return (
    <Container className={classes.root}>
      {successMessage ? (
        <h1 className={classes.message}>post has been updated</h1>
      ) : (
        <>
          {deletMessage ? (
            <h1 className={classes.message}>post has been deleted</h1>
          ) : (
            <div>
              <label htmlFor="titleInput" className={classes.titleLabel}>
                Title
              </label>
              <input
                id="titleInput"
                type="text"
                value={title}
                className={classes.titleInput}
                onChange={(event) => setTitle(event.target.value)}
                disabled={!editMode}
              />

              <CKEditor
                editor={ClassicEditor}
                data={data}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => setData(editor.getData())}
                disabled={!editMode}
              />

              {editMode ? (
                <Button
                  variant={"dark mt-2"}
                  className={classes.buttonSave}
                  onClick={() => handleSubmit()}
                >
                  save changes{" "}
                </Button>
              ) : (
                <>
                  <Button
                    variant={"dark"}
                    className={classes.buttonSave}
                    onClick={() => setEditMode(!editMode)}
                  >
                    edit post{" "}
                  </Button>
                  <Button
                    variant={"dark"}
                    className={classes.buttonSave}
                    name={"deleteButton"}
                    onClick={(event) => handleDelete(event)}
                  >
                    delete post{" "}
                  </Button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
}
