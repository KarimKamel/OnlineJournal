import React, { useContext } from "react";
const userContext = React.createContext();
function useUserContext() {
  return useContext(userContext);
}
export { useUserContext, userContext };
