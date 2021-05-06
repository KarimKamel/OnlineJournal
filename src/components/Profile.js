import { useUserContext } from "../context/UserContext";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useLayoutEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import useStyles from "../styles/profileStyles";

export default function Profile(props) {
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
      setLoading(true);
      const data = await userGetDetails(user);
      const { name, email, hobbies } = data;
      if (mounted) {
        setDetails({ name, email, hobbies });
        setLoading(false);
      }
    }
    let mounted = true;
    console.log("mounted profile");
    userGetDetailsWrapper();
    return () => {
      mounted = false;
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
