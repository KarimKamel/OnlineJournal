import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function Signout() {
  const userContext = useUserContext();

  useEffect(() => {
    console.log("calling signout");
    userContext.userSignOut();
    console.log("after user signout");
  }, [userContext]);

  return <div>{console.log("render signout")}</div>;
}
