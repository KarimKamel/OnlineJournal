import { trackPromise } from "react-promise-tracker";

async function checkAuth() {
  const response = await fetch("http://localhost:3001/users/auth", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
async function refreshAuth() {
  const response = await fetch("http://localhost:3001/users/refreshToken", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

async function checkAndRefreshAuth() {
  let res = await checkAuth();
  if (res.status === 200) {
    console.log("access token valid");
    let username = await res.text();
    console.log("username: " + username);
    return username;
  } else if (res.status === 401) {
    console.log("access token expired");
    const message = await res.text();
    console.log(message);
    res = await refreshAuth();
    if (res.status === 200) {
      console.log("new access token issued");
      let res = await checkAuth();
      if (res.status === 200) {
        console.log("access token valid");
        let username = await res.text();
        console.log("username: " + username);

        return username;
      } else {
        console.log("2nd check auth returned " + res.status);
        let message = await res.text();
        console.log(message);
        return;
      }
    } else {
      return;
    }
  } else {
    let message = await res.text();
    console.log(message);
    return;
  }
}

async function signout() {
  const res = await fetch("http://localhost:3001/users/signout", {
    withCredentials: true,
    credentials: "include",
  });
  return res;
}

async function signin(data) {
  // Default options are marked with *
  const response = await fetch("http://localhost:3001/users/signin", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}
async function signup(data) {
  // Default options are marked with *
  const response = await fetch("http://localhost:3001/users/signup", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  console.log("authAPI signup response");
  console.log(response);
  return response; // parses JSON response into native JavaScript objects
}
async function googleSignin(accessTokenObj) {
  const res = await fetch("http://localhost:3001/users/google/signin", {
    method: "POST",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(accessTokenObj),
    // body: accessToken,
  });
  return res;
}

export {
  checkAuth,
  refreshAuth,
  signin,
  signout,
  signup,
  checkAndRefreshAuth,
  googleSignin,
};
