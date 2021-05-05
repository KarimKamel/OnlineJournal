import { serverUrl } from "../config";

async function checkAuth() {
  var formedUrl = `${serverUrl}users/auth`;
  console.log(formedUrl);
  console.log("checking auth");

  const response = await fetch(formedUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
async function refreshAuth() {
  const response = await fetch(`${serverUrl}users/refreshToken`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
async function getHome() {
  const response = await fetch(`${serverUrl}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.text();
  console.log(response);
  console.log(response.headers);
  console.log(data);

  return response;
}

async function checkAndRefreshAuth() {
  console.log("in check and refresh auth");
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
  const res = await fetch(`${serverUrl}users/signout`, {
    withCredentials: true,
    credentials: "include",
  });
  return res;
}

async function signin(data) {
  // Default options are marked with *
  const response = await fetch(`${serverUrl}users/signin`, {
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
  const response = await fetch(`${serverUrl}users/signup`, {
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
  const res = await fetch(`${serverUrl}users/google/signin`, {
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
async function updateDetails(data) {
  const { username, name, email, hobbies } = data;
  const res = await fetch(`${serverUrl}users/${username}`, {
    // const res = await fetch(`${serverUrl}users/user`, {
    method: "PATCH",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({ name, email, hobbies }),
  });
  return res;
}
async function getDetails(data) {
  const username = data;
  const res = await fetch(`${serverUrl}users/${username}`, {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res;
}

export {
  getHome,
  checkAuth,
  refreshAuth,
  signin,
  signout,
  signup,
  checkAndRefreshAuth,
  googleSignin,
  updateDetails,
  getDetails,
};
