import { useState, useEffect, useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles({
  root: {},
  form: { marginTop: "2rem" },
  button: {
    marginBottom: "2rem",
  },
  dividerContainer: {},
  dividerText: {
    marginTop: "-45px",
    border: "2px solid black",
    display: "inline-block",
    borderRadius: "50%",
    background: "white",
    padding: "1rem",
    marginLeft: "50%",
    transform: "translate(-50%,-20%)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4rem",
  },
  googleButton: {
    width: "80%",
    background: "red",
    color: "white",
    padding: "1rem",
    border: "0px",
    boxShadow: "2px 3px 5px black",
  },
});

export default function Signin(props) {
  const history = useHistory();
  const userContext = useUserContext();
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    console.log("logging user context:" + JSON.stringify(userContext));
  }, [userContext]);

  const [formFields, setFormFields] = useState({
    username: "nameone",
    password: "password",
  });

  const handleChange = (e) => {
    console.log("change");
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    console.log(e);
    console.log("submit");
    e.preventDefault();
    console.log(userContext);
    const user = formFields;
    const result = await userContext.userSignIn(user);
    console.log(result);
    if (result === false) {
      setErrorMessage(true);
    }
  };

  async function responseGoogle(response) {
    console.log(response.tokenObj["access_token"]);
    const accessTokenObj = { access_token: response.tokenObj.access_token };
    userContext.userGoogleSignIn(accessTokenObj);
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

        <Button className={classes.button} variant="primary" type="submit">
          Submit
        </Button>
        {errorMessage && (
          <Alert variant={"danger"}>
            Unable to login. Username or password are incorrect
          </Alert>
        )}
      </Form>
      <div>
        <hr></hr>

        <h1 className={classes.dividerText}>Or</h1>
      </div>
      {/* <div className={classes.buttonContainer}>
        <button onClick={handleClick} className={classes.googleButton}>
          <i class="fab fa-google mr-2"></i>
          <span>connect with google</span>
        </button>
      </div> */}
      <GoogleLogin
        clientId="507566462397-llnfhqvlk2g21hsviv4jditq01i9f860.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
    </Container>
  );

  // return (
  //   <div>
  //     {console.log(userContext.user)}
  //     {console.log("no user found")}
  //     <h1>Signin Page</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="">username</label>
  //       <input
  //         value={formFields.username}
  //         onChange={handleChange}
  //         name="username"
  //       />
  //       <label htmlFor="">password</label>
  //       <input
  //         value={formFields.password}
  //         onChange={handleChange}
  //         name="password"
  //       />
  //       <button type="submit">Submit</button>
  //     </form>
  //   </div>
  // );
  // function protect() {
  //   if (userContext.user) {
  //     history.push("/profile");
  //   } else {
  //     return (
  //       <>
  //         {console.log(userContext.user)}
  //         {console.log("no user found")}
  //         <h1>Signin Page</h1>
  //         <form onSubmit={handleSubmit}>
  //           <label htmlFor="">username</label>
  //           <input
  //             value={formFields.username}
  //             onChange={handleChange}
  //             name="username"
  //           />
  //           <label htmlFor="">password</label>
  //           <input
  //             value={formFields.password}
  //             onChange={handleChange}
  //             name="password"
  //           />
  //           <button type="submit">Submit</button>
  //         </form>
  //       </>
  //     );
  //   }
  // }

  // return <div>{protect()}</div>;
}
