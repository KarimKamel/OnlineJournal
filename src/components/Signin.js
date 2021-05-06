import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { googleClientId } from "../config";
import useStyles from "../styles/signinStyles";

export default function Signin(props) {
  const userContext = useUserContext();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    console.log("logging user context:" + JSON.stringify(userContext));
  }, [userContext]);

  const [formFields, setFormFields] = useState({
    username: "user",
    password: "pass1234",
    remember: false,
  });
  const handleCheck = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: !formFields.remember,
    }));
  };
  const handleChange = (e) => {
    console.log("change");
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = formFields;
    const result = await userContext.userSignIn(user);
    console.log(result);
    if (result === false) {
      setErrorMessage(true);
    }
  };

  async function responseGoogle(response) {
    try {
      console.log(response);
      // console.log(response.tokenObj["access_token"]);
      const accessTokenObj = { access_token: response.tokenObj.access_token };
      userContext.userGoogleSignIn(accessTokenObj);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      {console.log("rendering sign in")}
      <h2 className="mt-3">sign in</h2>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={formFields.password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            name="remember"
            onChange={handleCheck}
            type="checkbox"
            label="remember me on this pc"
          />
        </Form.Group>

        <Button className={classes.button} variant="primary" type="submit">
          Submit
        </Button>
        {errorMessage && (
          <Alert variant={"danger"}>
            Unable to login. Username or password are incorrect
          </Alert>
        )}
      </Form>
      <div className={classes.dividerContainer}>
        <hr></hr>

        <h1 className={classes.dividerText}>Or</h1>
      </div>

      <div className={classes.buttonContainer}>
        <GoogleLogin
          clientId={googleClientId}
          className={classes.googleButton}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </Container>
  );
}
