import { useState, useEffect, useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Form, Button, Container, Alert } from "react-bootstrap";

const useStyles = makeStyles({
  root: {},
  form: { marginTop: "2rem" },
  button: {
    marginBottom: "2rem",
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

  return (
    <Container>
      {console.log("rendering sign in")}
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
