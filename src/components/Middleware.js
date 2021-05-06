import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function Middleware({ props }) {
  const location = useLocation();

  const userContext = useUserContext();

  useLayoutEffect(() => {
    async function checkTokenValidity() {
      userContext.setLoading(true);
      console.log("loading state true");
      console.log("calling check and refresh");
      console.log("user currently set to: " + userContext.user);

      await userContext.userCheckAndRefreshAuth();
      console.log("returned from  check and refresh, disabling loading");

      userContext.setLoading(false);
    }

    checkTokenValidity();
  }, [location.pathname]);

  return (
    <div>
      {console.log("rendering middleware")}
      {console.log("location in render" + location.pathname)}
    </div>
  );
}
