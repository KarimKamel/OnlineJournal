import {
  signin,
  checkAndRefreshAuth,
  signout,
  signup,
  googleSignin,
} from "../api/authApi";
import { useState } from "react";
import { trackPromise } from "react-promise-tracker";

export default function useUserProvider() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log("useUserProvider signup res:");
      console.log(res);
      if (res.status === 200) {
        console.log("user signin successfull");

        setUser(username);
      }
    });
  }
  async function userGoogleSignIn(accessTokenObj) {
    const res = await googleSignin(accessTokenObj);
    console.log("useUserProvider googleSignIn res:");
    console.log(res);
    if (res.status === 200) {
      console.log("user signin successfull");
      const username = await res.json();

      setUser(username);
      return true;
    }
    if (res.status > 400) {
      console.log(res.status);
      console.log("unauthorized");
      return false;
    }
  }
  async function userSignOut() {
    const res = await signout();
    if (res.status === 200) {
      setUser("");
      console.log("user removed from context");

      return res;
    }
  }

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
    userGoogleSignIn,
    userSignIn,
    userSignOut,
    userSignUp,
    loading,
    setLoading,
  };
}
