import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function Signout() {
  const userContext = useUserContext();

  useEffect(() => {
    async function signoutWrapper() {
      console.log("calling signout");
      const res = await userContext.userSignOut();
      console.log("after user signout, status = " + res.status);
    }
    signoutWrapper();
  }, []);

  return <div>{console.log("render signout")}</div>;
}
