import { useUserContext } from "../context/UserContext";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";

const useStyles = makeStyles({
  title: {
    padding: "2rem",
    textAlign: "center",
  },
  row: {
    marginBottom: "1rem",
  },
  label: {
    verticalAlign: "middle",
    marginBottom: "0",
    fontWeight: "bold",
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
  button: { display: "block", marginLeft: "auto" },
});

export default function Profile(props) {
  const mounted = useRef(false); //useRef to be able to check if component is mounted. useRef is used instead of regular variable because regular variable state does not persist if modified in useEffect
  const userContext = useUserContext();
  const { user, userGetDetails, userUpdateDetails } = userContext;

  const [details, setDetails] = useState({
    name: "",
    email: "",
    hobbies: "",
  });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useLayoutEffect(() => {
    async function userGetDetailsWrapper() {
      if (mounted.current === true) {
        setLoading(true);

        const data = await userGetDetails(user);
        const { name, email, hobbies } = data;
        if (mounted.current === true) {
          setDetails({ name, email, hobbies });
          setLoading(false);
        }
      }
    }
    mounted.current = true;
    userGetDetailsWrapper();
    return () => {
      console.log("setting ref to false");
      mounted.current = false;
    };
  }, []);

  function onChange(event) {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  async function handleClick() {
    const { name, hobbies, email } = details;
    setLoading(true);
    const res = await userUpdateDetails(user, name, email, hobbies);
    setLoading(false);
    console.log(res);
  }

  return (
    <Container>
      {console.log("render profile")}
      {loading ? (
        <div className={classes.spinnerContainer}>
          {" "}
          <Spinner animation="border" className={classes.spinner} role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <h1 className={classes.title}>{user}'s Profile Page</h1>
          <Row className={classes.row}>
            <Col xs={2}>
              <Form.Label className={classes.label}>Email address</Form.Label>
            </Col>
            <Col xs={6}>
              <Form.Control
                onChange={onChange}
                name="email"
                value={details.email}
                // value={emailData}
                type="email"
              />
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs={2}>
              <Form.Label className={classes.label}>Name</Form.Label>
            </Col>
            <Col xs={6}>
              <Form.Control
                onChange={onChange}
                name="name"
                value={details.name}
                // value={nameData}
                type="text"
              />
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs={2}>
              <Form.Label className={classes.label}>
                Interests and hobbies
              </Form.Label>
            </Col>
            <Col xs={6}>
              <Form.Control
                onChange={onChange}
                name="hobbies"
                value={details.hobbies}
                // value={hobbiesData}
                as="textarea"
                rows={3}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              {" "}
              <Button
                onClick={handleClick}
                className={classes.button}
                variant="dark"
              >
                save
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}
