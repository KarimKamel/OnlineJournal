import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
  },
  linkContainer: { textAlign: "end" },
  card: { marginTop: "2rem" },
  cardText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  spinnerContainer: {
    display: "flex",
    paddingTop: "20vh",
    justifyContent: "center",
  },
  spinner: {
    width: "5rem",
    height: "5rem",
  },

  noEntriesMessageContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "4rem",
    border: "2px solid black",
    marginTop: "6rem",
    paddingBottom: "4rem",
    alignItems: "center",
    background: "lightsteelblue",
    borderRadius: "5px",
  },
});

export default useStyles;
