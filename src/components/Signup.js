import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import passwordValidator from "password-validator";

const useStyles = makeStyles({
  root: {},
  form: { marginTop: "2rem" },
  errorMessage: {
    color: "red",
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
});

export default function Signup(props) {
  const userContext = useUserContext();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    errorMessageList: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("logging user context:" + JSON.stringify(userContext));
  }, [userContext]);

  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    console.log("change");
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    console.log(userContext);
    const { username, password } = formFields;
    const errorList = validatePassword(password);
    console.log(errorList);

    if (errorList.length > 0) {
      let messageList = [];

      errorList.forEach((error) => {
        let message;
        if (error === "min") message = "password must be at least 8 characters";
        if (error === "max") message = "password cannot exceed 100 characters";
        if (error === "digits")
          message = "password must contain at least one digit";
        if (error === "spaces") message = "password cannot contain spaces";
        console.log(message);
        messageList.push(message);
      });
      setErrorMessage({ status: true, errorMessageList: messageList });
    } else {
      setLoading(true);
      const result = await userContext.userSignUp(username, password);
      setLoading(false);

      if (result !== username) {
        setErrorMessage({ status: true, errorMessageList: [result] });
      }
    }
  };

  var schema = new passwordValidator();

  function validatePassword(password) {
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .digits(1) // Must have at least 2 digits
      .has()
      .not()
      .spaces();

    return schema.validate(password, { list: true });
  }

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
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>username</Form.Label>
            <Form.Control
              value={formFields.username}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>password</Form.Label>
            <Form.Control
              value={formFields.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>repeat password</Form.Label>
            <Form.Control
              value={formFields.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="password"
            />
          </Form.Group>
          {errorMessage.status && (
            <div>
              {errorMessage.errorMessageList.map((err) => (
                <p key={err} className={classes.errorMessage}>
                  {err}
                </p>
              ))}
            </div>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
}
