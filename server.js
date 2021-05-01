const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("env", process.env.NODE_ENV);

require("./config/passport")(passport);
require("./config/db")(mongoose);
const sessionConfiguration = require("./config/session");

const app = express();

app.set("trust proxy", true);
app.use(passport.initialize());
app.use(passport.session());

app.use(require("cookie-parser")());
app.use(require("morgan")("combined"));
if (process.env.NODE_ENV === "production") {
  sessionConfiguration.cookie.secure = true;
  app.set("trust proxy", true); // trust first proxy

  console.log("secure cookie set to true");
}

app.use(session(sessionConfiguration));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

const entriesRouter = require("./api/entries");
const usersRouter = require("./api/users");
// const authRouter = require("./api/auth");
app.use("/entries", entriesRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => res.send("home"));
// app.use("/auth", authRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening to " + port);
});
