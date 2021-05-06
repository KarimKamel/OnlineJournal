import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  title: {
    marginTop: "2rem",
    marginBottom: "4rem",
  },
  description: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    paddingLeft: "1rem",
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

export default useStyles;
