var express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
var session = require("express-session");

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

const refreshSecret = "refresh";
const accessSecret = "access";
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
// app.use(cors({ credentials: true }));
// app.use(cors());

const port = 3001;

app.get("/", (req, res) => {
  console.log("home route");
  res.send("server root");
});

function authenticateUser(user) {
  return true;
}

app.post("/signin", (req, res) => {
  console.log("sign in");
  const user = req.body;
  if (authenticateUser(user)) {
    const refreshToken = jwt.sign({ username: user.username }, refreshSecret, {
      algorithm: "HS256",
    });
    const accessToken = jwt.sign({ username: user.username }, accessSecret, {
      algorithm: "HS256",
      expiresIn: "10s",
    });

    req.session.refreshToken = refreshToken;
    req.session.accessToken = accessToken;

    res.status(200).end();
  } else {
    res.status(403).end();
  }
});

app.get("/refreshToken", (req, res) => {
  console.log("refresh token");
  const refreshToken = req.session.refreshToken;
  const accessToken = getAccessToken(refreshToken);
  req.session.accessToken = accessToken;

  console.log("new access token issued");
  res.status(200).end();
});
app.get("/signout", (req, res) => {
  console.log("server signout");

  req.session.destroy();
  res.clearCookie("connect.sid");

  res.send();
});

app.get("/auth", (req, res) => {
  console.log("auth get");
  const { refreshToken, accessToken } = req.session;
  try {
    const accessUser = jwt.verify(accessToken, accessSecret);
    console.log("access token valid");
    console.log("username in token: " + accessUser.username);
    res.status(200).send(accessUser.username);
  } catch (err) {
    if (err.message == "jwt expired") {
      res.status(401).end(err.message);
    } else {
      res.status(403).end(err.message);
    }
  }
});
app.get("/profile", (req, res) => {
  console.log("in get profile");
  const { refreshToken, accessToken } = req.session;
  try {
    const accessUser = jwt.verify(accessToken, accessSecret);
    console.log("access token valid");
    console.log("username in token: " + accessUser.username);
    res.status(200).send(accessUser.username);
  } catch (err) {
    if (err.message == "jwt expired") {
      res.status(401).end(err.message);
    } else {
      res.status(403).end(err.message);
    }
  }
});

// app.get("/profile", (req, res) => {
//   console.log("in profile get");
//   res.status(200).end();
// });
app.listen(port, () => {
  console.log("listening to " + port);
});

function getAccessToken(refreshToken) {
  try {
    const refreshUser = jwt.verify(refreshToken, refreshSecret);
    const accessToken = jwt.sign(
      { username: refreshUser.username },
      accessSecret,
      {
        algorithm: "HS256",
        expiresIn: "10s",
      }
    );
    return accessToken;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}
