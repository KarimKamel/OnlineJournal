import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
  },
  linkContainer: { textAlign: "end" },
  card: { marginBottom: "2rem" },
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
  dateContainer: {
    backgroundColor: "black",
    color: "white",
  },
  newEntryButton: {
    display: "block",

    marginBottom: "2rem",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "2rem",
    paddingBottom: "2rem",

    "& .page-item .page-link": {
      color: "black",
    },
    "& .page-item.active .page-link": {
      backgroundColor: "black",
      borderColor: "black",
      color: "white",
    },
  },
});

export default useStyles;
