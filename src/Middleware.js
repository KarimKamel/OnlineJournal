import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function Middleware(props) {
  const location = useLocation();

  const userContext = useUserContext();

  useEffect(() => {
    async function checkTokenValidity() {
      userContext.setLoading(true);
      console.log("loading set to true");
      console.log("###########################");
      await userContext.userCheckAndRefreshAuth();
      userContext.setLoading(false);
      console.log("loading set to false");
      console.log("###########################");
    }
    checkTokenValidity();
  }, [location.pathname]);

  const myStyle = {
    backgroundColor: "blue",
  };

  return (
    <div style={myStyle}>
      {console.log("rendering middleware")}
      {userContext.loading && <h1>middleware</h1>}
    </div>
  );
}
