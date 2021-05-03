import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Navbar, Nav } from "react-bootstrap";

export default function NavComp(props) {
  const classes = useStyles();
  const userContext = useUserContext();
  useEffect(() => {
    console.log("useeffect Navbar");
  }, [userContext.user]);

  return (
    <Navbar bg="light" expand="sm">
      {console.log("rendering nav")}

      <Navbar.Brand>
        <b>My Online Journal</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          {userContext.user ? (
            <>
              <Link className="nav-link" to="/Calendar">
                Calendar
              </Link>
              <Link className="nav-link" to="/journal">
                Journal
              </Link>
              <Link className="nav-link" to="/allentries">
                All Entries
              </Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              {/* <Link className="nav-link" to="/signout">
                Signout
              </Link> */}
              <button
                className={`${classes.signoutButton} nav-link`}
                onClick={() => userContext.userSignOut()}
              >
                Signout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/signin">
                Signin
              </Link>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const useStyles = makeStyles({
  root: {
    background: "purple",

    padding: "10px",
  },
  item: {
    fontSize: "2rem",
    marginRight: "1rem",
    color: "white",
    textDecoration: "none",
    // "&:first-child": {
    //   marginLeft: "1rem",
    // },

    "&:hover": {
      color: "black",
    },
  },
  signoutButton: {
    borderStyle: "none",
    backgroundColor: "inherit",
  },
});
