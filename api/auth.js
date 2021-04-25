const express = require("express");
const passport = require("passport");
const accessTokenExpiry = "10s";
var jwt = require("jsonwebtoken");

const router = express.Router();
router.post(
  "/google/verify",
  passport.authenticate("google-token", { session: false }),
  function (req, res) {
    console.log("hit verify");
    const refreshToken = jwt.sign(
      { username: req.user.username },
      process.env.REFRESH_SECRET,
      {
        algorithm: "HS256",
      }
    );
    const accessToken = jwt.sign(
      { username: req.user.username },
      process.env.ACCESS_SECRET,
      {
        algorithm: "HS256",
        expiresIn: accessTokenExpiry,
      }
    );

    req.session.refreshToken = refreshToken;
    req.session.accessToken = accessToken;

    res.status(200).json(req.user.username);
  }
);

router.get("/google", passport.authenticate("google", { scope: "email" }));
router.get(
  "/google/callback",
  passport.authenticate("google"),
  function (req, res) {
    console.log("callback");
    res.send("authenticated");
  }
  //   passport.authenticate("google", { failureRedirect: "/auth" }),
  //   function (req, res) {
  //     res.redirect("/");
  //   }
);
module.exports = router;
