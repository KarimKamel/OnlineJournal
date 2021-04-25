var express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
var session = require("express-session");
var entriesRouter = require("./api/entries");
var mongoConnectionString =
  "mongodb+srv://adminkk:koolkool@mongo@cluster0.xxw3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var dateFormat = require("dateformat");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to db");
});

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl: mongoConnectionString }),
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
app.use("/entries", entriesRouter);

app.get("/", (req, res) => {
  console.log("home route");
  res.send("server root");
});

app.listen(port, () => console.log("Listening to port:" + port));
