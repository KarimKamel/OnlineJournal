import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  title: {
    padding: "2rem",
    textAlign: "center",
  },
  row: {
    marginBottom: "1rem",
  },
  label: {
    verticalAlign: "middle",
    marginBottom: "0",
    fontWeight: "bold",
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
  button: { display: "block", marginLeft: "auto" },
});
export default useStyles;
