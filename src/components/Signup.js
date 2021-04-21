import { useState, useEffect, useContext } from "react";
import { useUserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const useStyles = makeStyles({
  root: {},
  form: { marginTop: "2rem" },
});

export default function Signup(props) {
  const history = useHistory();
  const userContext = useUserContext();
  const classes = useStyles();

  useEffect(() => {
    console.log("logging user context:" + JSON.stringify(userContext));
  }, [userContext]);

  const [formFields, setFormFields] = useState({
    username: "user1",
    password: "pass",
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
    const passwordValid = validatePassword(password);
    const usernameValid = await validateUsername(username);

    if (!usernameValid) {
      console.log("invalid username");
    } else if (!passwordValid) {
      console.log("invalid password");
    } else {
      console.log(
        "user signup with username: " + username + ". password: " + password
      );
      userContext.userSignUp(username, password);
    }
  };
  function validatePassword(password) {
    return true;
  }
  async function validateUsername(username) {
    return true;
  }

  return (
    <Container>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
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
