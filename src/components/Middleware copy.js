import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function Middleware(props) {
  //   const classes = useStyles();
  const match = useRouteMatch();
  const [children, setChildren] = useState([]);
  const location = useLocation();
  //   const history = useHistory();
  const userContext = useUserContext();

  useLayoutEffect(() => {
    console.log("useeffect middleware");

    console.log("current route " + location.pathname);
    console.log("current user " + userContext.user);
    async function checkTokenValidity() {
      userContext.setLoading(true);
      console.log("loading set to true");
      await userContext.userCheckAndRefreshAuth();
      userContext.setLoading(false);
      console.log("loading set to false");
    }
    checkTokenValidity();
  }, [location.pathname]);

  return (
    <div>
      {console.log("render middleware copy")}
      {console.log(location.pathname)}
      {location.pathname}
      {userContext.loading ? <h1>Loading...</h1> : props.children}
    </div>
  );
}

// const useStyles = makeStyles({
//   root: {
//     background: "purple",

//     padding: "10px",
//   },
//   item: {
//     fontSize: "2rem",
//     marginRight: "1rem",
//     color: "white",
//     textDecoration: "none",
//     "&:first-child": {
//       marginLeft: "1rem",
//     },

//     "&:hover": {
//       color: "black",
//     },
//   },
// });
