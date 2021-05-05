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

      await userContext.userCheckAndRefreshAuth();
      userContext.setLoading(false);
      console.log("loading state false");
    }
    checkTokenValidity();
  }, [location.pathname]);

  return <div>{console.log("rendering middleware")}</div>;
}
