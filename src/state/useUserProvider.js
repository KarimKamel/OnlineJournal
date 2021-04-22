import { signin, checkAndRefreshAuth, signout, signup } from "../api/authApi";
import { useState } from "react";
import { trackPromise } from "react-promise-tracker";

export default function useUserProvider() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  // function userSignIn(user) {
  //   console.log("useuserprovider signin");
  //   signin(user).then((res) => {
  //     if (res.status === 200) {
  //       console.log("user signin successfull");

  //       setUser(user.username);
  //       return true;
  //     }
  //     if (res.status === 403) {
  //       console.log(res.status);
  //       return false;
  //     }

  //     console.log(res);
  //   });
  // }
  async function userSignIn(user) {
    console.log("useuserprovider signin");
    const res = await signin(user);
    if (res.status === 200) {
      console.log("user signin successfull");

      setUser(user.username);
      return true;
    }
    if (res.status === 403) {
      console.log(res.status);
      return false;
    }

    console.log(res);
  }

  function userSignUp(username, password) {
    signup({ username, password }).then((res) => {
      if (res.status === 200) {
        console.log("user signin successfull");

        setUser(user.username);
      }
    });
  }
  async function userSignOut() {
    const res = await signout();
    if (res.status === 200) {
      setUser("");
      console.log("user removed from context");

      return res;
    }
  }
  // function userSignOut(user) {
  //   signout().then((res) => {
  //     if (res.status === 200) {
  //       console.log("user signout successfull");
  //       setUser("");
  //     }
  //   });
  // }
  // function userCheckAndRefreshAuth() {
  //   console.log("setting loading to true");
  //   checkAndRefreshAuth().then((username) => {
  //     console.log("check and refresh returned: " + username);
  //     if (username) {
  //       console.log("setting user" + username);
  //       setUser(username);
  //     }
  //     console.log("setting loading to false");
  //     setLoading(false);
  //   });
  // }
  async function userCheckAndRefreshAuth() {
    const username = await checkAndRefreshAuth();
    console.log("check and refresh returned: " + username);
    if (username) {
      setUser(username);
      console.log("setting user in context" + username);
    }
    return;
    // console.log("setting loading to false");
    // setLoading(false);
  }

  return {
    user,
    userCheckAndRefreshAuth,
    userSignIn,
    userSignOut,
    userSignUp,
    loading,
    setLoading,
  };
}
