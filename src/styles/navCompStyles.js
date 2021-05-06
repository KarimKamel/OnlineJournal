import { makeStyles } from "@material-ui/styles";
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
  signoutButton: {
    borderStyle: "none",
    backgroundColor: "inherit",
  },
});
export default useStyles;
