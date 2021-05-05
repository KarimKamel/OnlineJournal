var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const accessTokenExpiry = "10m";
const saltRounds = 10;
const passport = require("passport");

async function authenticateUser(userInBody) {
  try {
    const userInDb = await User.findOne({ username: userInBody.username });
    if (userInDb) {
      const result = await bcrypt.compare(
        userInBody.password,
        userInDb.password
      );
      if (result === true) {
        return true;
      }
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
function getAccessToken(refreshToken) {
  try {
    const refreshUser = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign(
      { username: refreshUser.username },
      process.env.ACCESS_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "10s",
      }
    );
    return accessToken;
  } catch (err) {
    console.log(err.message);
    return;
  }
}
function getTokens(username) {
  const refreshToken = jwt.sign({ username }, process.env.REFRESH_SECRET, {
    algorithm: "HS256",
  });
  const accessToken = jwt.sign({ username }, process.env.ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: accessTokenExpiry,
  });
  return { accessToken, refreshToken };
}

router.post(
  "/google/signin",
  passport.authenticate("google-token", { session: false }),
  function (req, res) {
    const username = req.user.username;
    const { refreshToken, accessToken } = getTokens(username);

    req.session.refreshToken = refreshToken;
    req.session.accessToken = accessToken;

    res.status(200).json(req.user.username);
  }
);

//to do duplicated key error
router.post("/signup", async (req, res) => {
  const user = req.body;
  console.log("creating user: " + JSON.stringify(user));
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  const newUser = new User({
    username: user.username,
    password: passwordHash,
    email: "",
    hobbies: "",
    name: "",
  });

  try {
    const user = await newUser.save();
    console.log("user created:" + user);
    const { username } = user;
    const { refreshToken, accessToken } = getTokens(username);

    req.session.refreshToken = refreshToken;
    req.session.accessToken = accessToken;
    if (user.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
    }
    console.log("access token set to: " + req.session.accessToken);
    console.log("refresh token set to: " + req.session.refreshToken);
    res.status(200).send({ username: user.username });
  } catch (err) {
    if (err) {
      console.log(err);
      if (err.code === 11000)
        res.status(403).json({ message: "username is taken" });
    }
  }
});

router.patch("/:username", async (req, res) => {
  try {
    const username = req.params;
    const user = await User.findOne(username);
    const { name, email, hobbies } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
        email,
        hobbies,
      },
      { new: true }
    );
    console.log(updatedUser);
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
});
router.post("/signin", async (req, res) => {
  console.log("sign in");
  const user = req.body;
  const result = await authenticateUser(user);
  console.log("authentication result " + result);
  if (result) {
    const username = user.username;
    const { refreshToken, accessToken } = getTokens(username);

    req.session.refreshToken = refreshToken;
    req.session.accessToken = accessToken;
    if (user.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
    }
    console.log("access token set to: " + req.session.accessToken);
    console.log("refresh token set to: " + req.session.refreshToken);

    res.status(200).end();
  } else {
    res.status(403).end();
  }
});

router.get("/refreshToken", (req, res) => {
  console.log("refresh token");
  const refreshToken = req.session.refreshToken;
  const accessToken = getAccessToken(refreshToken);
  if (accessToken) {
    req.session.accessToken = accessToken;

    console.log("new access token issued");
    res.status(200).end();
  } else {
    res.status(403).end();
  }
});

router.get("/auth", async (req, res) => {
  console.log("auth get");
  console.log(req.session);
  const { refreshToken, accessToken } = req.session;
  console.log("received access token: " + accessToken);
  console.log("received refresh token: " + refreshToken);
  try {
    const accessUser = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    console.log("access token valid");
    console.log("username in token: " + accessUser.username);
    res.status(200).send(accessUser.username);
  } catch (err) {
    if (err.message == "jwt expired") {
      console.log("token expired");
      res.status(401).end(err.message);
    } else {
      console.log(err.message);
      res.status(403).end(err.message);
    }
  }
});
router.get("/signout", (req, res) => {
  console.log("server signout");
  res.clearCookie("connect.sid");

  req.session.destroy();
  req.sessionStore.destroy();

  res.status(200).end();
  console.log("ended user signout server");
});

router.get("/profile", (req, res) => {
  console.log("in get profile");
  const { refreshToken, accessToken } = req.session;
  try {
    const accessUser = jwt.verify(accessToken, process.env.ACCESS_SECRET);
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
router.get("/:username", async (req, res) => {
  console.log("getting user details");
  try {
    const username = req.params;
    const user = await User.findOne(username);
    user.password = "";
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).end();
  }
});

module.exports = router;
