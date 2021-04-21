import { useUserContext } from "../context/UserContext";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    marginTop: "2rem",
  },
});

export default function Home() {
  const userContext = useUserContext();
  const classes = useStyles();

  // if (userContext.userState) {
  //   console.log(userContext.userState);
  // }

  return (
    <Container className={classes.root}>
      <h1 className={classes.title}>{console.log("rendering home")} Home</h1>
    </Container>
  );
}
