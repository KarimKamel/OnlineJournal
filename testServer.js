const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
var mongoConnectionString =
  "mongodb+srv://adminkk:koolkool@mongo@cluster0.xxw3h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.listen(4000, () => console.log("Listening"));
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 365 },
    store: MongoStore.create({
      mongoUrl: mongoConnectionString,
      ttl: 10 * 60 * 60, // = 14 days. Default
    }),
  })
);

app.get("/", (req, res) => {
  req.session.message = "hello";
  res.send("welcome home");
});
app.get("/read", (req, res) => {
  res.send(req.session.message || "no message");
});
