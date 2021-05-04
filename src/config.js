let serverUrl, googleClientId;
if (process.env.NODE_ENV === "production") {
  serverUrl = process.env.REACT_APP_PROD_SERVER_URL;
  googleClientId = process.env.REACT_APP_PROD_GOOGLE_CLIENT_ID;
} else {
  serverUrl = process.env.REACT_APP_DEV_SERVER_URL;
  googleClientId = process.env.REACT_APP_DEV_GOOGLE_CLIENT_ID;
}

// const serverUrl = process.env.REACT_APP_LOCAL_SERVER_URL;
export { serverUrl, googleClientId };
