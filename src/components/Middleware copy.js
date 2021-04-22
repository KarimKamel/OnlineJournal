import { useLocation } from "react-router-dom";
import { useLayoutEffect, useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function Middleware({ setLoading }) {
  const location = useLocation();

  const userContext = useUserContext();

  useEffect(() => {
    async function checkTokenValidity() {
      // setLoading(true);
      console.log("loading set to true");
      console.log("###########################");
      await userContext.userCheckAndRefreshAuth();
      // setLoading(false);
      console.log("loading set to false");
      console.log("###########################");
    }
    checkTokenValidity();
  }, [location.pathname]);

  return <div>{console.log("rendering middleware")}</div>;
}
