import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Navbar, Nav } from "react-bootstrap";
import useStyles from "../styles/navCompStyles";

export default function NavComp(props) {
  const classes = useStyles();
  const userContext = useUserContext();
  const { rootRoute } = props;
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
          <Link className="nav-link" to={`${rootRoute}/`}>
            Home
          </Link>

          {userContext.user ? (
            <>
              <Link className="nav-link" to={`${rootRoute}/calendar`}>
                Calendar
              </Link>
              <Link className="nav-link" to={`${rootRoute}/journal`}>
                Journal
              </Link>
              <Link className="nav-link" to={`${rootRoute}/allentries`}>
                All Entries
              </Link>
              <Link className="nav-link" to={`${rootRoute}/profile`}>
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
              <Link className="nav-link" to={`${rootRoute}/signin`}>
                Signin
              </Link>
              <Link className="nav-link" to={`${rootRoute}/signup`}>
                Signup
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
