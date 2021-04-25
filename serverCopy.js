var express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
var session = require("express-session");
var mongoConnectionString =
  "mongodb+srv://adminkk:koolkool@mongo@cluster0.xxw3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var dateFormat = require("dateformat");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
var entriesRouter = require("./api/entries");
var usersRouter = require("./api/users");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var User = require("./models/User");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to db");
});

app.set("trust proxy", 1);
app.use(require("cookie-parser")());
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl: mongoConnectionString }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

const refreshSecret = "refresh";
const accessSecret = "access";
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
// app.use(cors({ credentials: true }));
// app.use(cors());
app.use("/entries", entriesRouter);
app.use("/users", usersRouter);

const port = 3001;

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
app.post("/signup", async (req, res) => {
  const user = req.body;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  const newUser = new User({
    username: user.username,
    password: passwordHash,
  });

  newUser.save((err, user) => {
    if (err) return console.log(err);
    console.log("user created:" + user);
  });
});

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/google/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("profile: " + JSON.stringify(profile));
      console.log("refresh token" + refreshToken);
      console.log("access token" + accessToken);
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality routerlication, the Facebook profile should
      // be associated with a user record in the routerlication's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);
    }
  )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality routerlication, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.

// Define routes.

app.get("/google", passport.authenticate("google", { scope: ["email"] }));

app.get(
  "/google/return",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    console.log("hit return");
    res.redirect("/google/profile");
  }
);

app.get(
  "/google/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.send(req.user);
  }
);

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
        expiresIn: "10m",
      }
    );
    return accessToken;
  } catch (err) {
    console.log(err.message);
    return;
  }
}
