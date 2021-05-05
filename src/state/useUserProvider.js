import {
  signin,
  checkAndRefreshAuth,
  signout,
  signup,
  googleSignin,
  updateDetails,
  getDetails,
} from "../api/authApi";
import { useState } from "react";

export default function useUserProvider() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  async function userSignIn(user) {
    console.log("in userSignIn");
    const res = await signin(user);
    if (res.status === 200) {
      console.log("user signin successfull");
      console.log("setting user to: " + user.username);
      setUser(user.username);
      return true;
    }
    if (res.status === 403) {
      console.log(res.status);
      return false;
    }

    console.log(res);
  }
  async function userUpdateDetails(username, name, email, hobbies) {
    const data = { username, name, email, hobbies };
    const res = await updateDetails(data);
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else return false;
  }
  async function userGetDetails(username) {
    const res = await getDetails(username);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else return false;
  }

  async function userSignUp(username, password) {
    const res = await signup({ username, password });
    console.log("useUserProvider signup res:");
    console.log(res);

    if (res.status === 200) {
      console.log("user signin successfull");

      setUser(username);
      return username;
    } else {
      const { message } = await res.json();
      return message;
    }
  }

  async function userGoogleSignIn(accessTokenObj) {
    console.log("in google sign in");
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
    // if (username) {
    //   setUser(username);
    //   console.log("setting user in context" + username);
    // } else {
    //   setUser("");
    //   console.log("removing user from context");
    // }
    // return;
    if (!username) {
      setUser("");
      console.log("removing user from context");
    } else if (username !== user) {
      setUser(username);
      console.log("putting user in context");
    }
    return;
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
    userGetDetails,
    userUpdateDetails,
  };
}
