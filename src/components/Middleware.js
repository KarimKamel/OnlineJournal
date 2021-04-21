import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function Middleware(props) {
  const location = useLocation();

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

  return <div>{console.log("rendering middleware")}</div>;
}
