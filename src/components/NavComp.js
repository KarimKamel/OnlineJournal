import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Transition } from "react-transition-group";

// export default function Nav(props) {
//   const classes = useStyles();
//   const userContext = useUserContext();
//   useEffect(() => {
//     console.log("useeffect Navbar");
//   }, [userContext.user]);

//   return (
//     <div>
//       {console.log("render navbar")}
//       <div>
//         <Link to="/">Home</Link>

//         {userContext.user ? (
//           <>
//             <Link to="/profile">Profile</Link>
//             {/* <Link className="nav-link" to="/signout">
//               Signout
//             </Link> */}
//             <button onClick={() => userContext.userSignOut()}>signout</button>
//           </>
//         ) : (
//           <Link to="/signin">Signin</Link>
//         )}
//       </div>
//     </div>
//   );
// }
export default function NavComp(props) {
  const classes = useStyles();
  const userContext = useUserContext();
  useEffect(() => {
    console.log("useeffect Navbar");
  }, [userContext.user]);

  return (
    <Navbar bg="light" expand="sm">
      {console.log("rendering nav")}

      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
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
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-link" to="/signout">
                Signout
              </Link>
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
});
