import { useUserContext } from "../context/UserContext";
import { Container, ListGroup, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { getHome } from "../api/authApi";
import journalImg from "../img/stockJournal.png";

const useStyles = makeStyles({
  title: {
    marginTop: "2rem",
    marginBottom: "4rem",
  },
  imageContainer: {
    width: "50%",
  },
  image: {
    marginLeft: "50%",
    marginTop: "-10%",
    width: "100%",
  },
  signoutButton: {
    borderStyle: "none",
    display: "inline",
    backgroundColor: "inherit",
    padding: "0",
    color: "dodgerblue",
  },
});

export default function Home() {
  const userContext = useUserContext();
  const classes = useStyles();

  useEffect(() => {
    getHome();
  });

  return (
    <Container className={classes.root}>
      {userContext.user ? (
        <>
          <Row>
            <Col xs={6}>
              <h1 className={classes.title}>
                Welcome Back, <Link to="/profile">{userContext.user}</Link>
              </h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/Journal">Journal</Link>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Link to="/Profile">Profile Page</Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <button
                    className={`${classes.signoutButton} list-group-item`}
                    onClick={() => userContext.userSignOut()}
                  >
                    Signout
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={6}>
              <div className={classes.imageContainer}>
                <img className={classes.image} src={journalImg} alt="" />
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col xs={6}>
              <h1 className={classes.title}>Welcome To My Online Journal</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/Signup">create an account</Link>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Link to="/Signin">Sign in with an existing account</Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={6}>
              <div className={classes.imageContainer}>
                <img className={classes.image} src={journalImg} alt="" />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
