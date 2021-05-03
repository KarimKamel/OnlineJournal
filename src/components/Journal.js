import { Container, ListGroup, Col, Row } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
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
  const classes = useStyles();

  // if (userContext.userState) {
  //   console.log(userContext.userState);
  // }

  return (
    <Container className={classes.root}>
      <Row>
        <Col xs={6}>
          <h1 className={classes.title}>
            Add, browse or edit your Journal entries from this page!
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <ListGroup>
            <ListGroup.Item>
              <Link to="/allentries">Browse All Entries</Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to="/Calendar">Browse Entries By Date</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/Entries/create-entry">create a new Entry</Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={6}>
          <div className={classes.imageContainer}>
            <img className={classes.image} src={journalImg} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
