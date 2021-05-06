import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  form: { marginTop: "2rem" },
  button: {
    marginBottom: "2rem",
  },
  dividerContainer: {
    marginTop: "4rem",
  },
  dividerText: {
    marginTop: "-45px",
    border: "2px solid black",
    display: "inline-block",
    borderRadius: "50%",
    background: "white",
    padding: "1rem",
    marginLeft: "50%",
    transform: "translate(-50%,-20%)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4rem",
  },
  googleButton: {
    width: "80%",
    background: "red !important",
    color: "white",
    padding: "1rem",
    border: "0px",
    boxShadow: "2px 3px 5px black",
  },
});
export default useStyles;
