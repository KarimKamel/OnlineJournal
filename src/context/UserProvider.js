import { userContext } from "./UserContext";
import useUserProvider from "../state/useUserProvider";

export default function UserProvider(props) {
  const userMethods = useUserProvider();
  return (
    <userContext.Provider value={userMethods}>
      {props.children}
    </userContext.Provider>
  );
}
