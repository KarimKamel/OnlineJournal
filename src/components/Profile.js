import { useHistory } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  title: {
    padding: "2rem",
    textAlign: "center",
  },
});

export default function Profile(props) {
  const userContext = useUserContext();
  const { user } = userContext;
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container>
      {user ? (
        <div>
          <h1 className={classes.title}>{user}'s Profile</h1>
        </div>
      ) : (
        <div>
          <h1>access denied</h1>
          <button onClick={() => history.push("/signin")}>
            go back to sign in page
          </button>
        </div>
      )}
    </Container>
  );
}
