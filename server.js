const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

require("dotenv").config();
require("./config/passport")(passport);
require("./config/db")(mongoose);
const sessionMiddleware = require("./config/session")(session);

const app = express();

app.set("trust proxy", 1);
app.use(passport.initialize());
app.use(passport.session());

app.use(require("cookie-parser")());
app.use(require("morgan")("combined"));
app.use(sessionMiddleware);
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, httpOnly: true },
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING }),
//   })
// );
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
