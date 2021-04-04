var express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
const refreshSecret = "refresh";
const accessSecret = "access";
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3001;

app.get("/", (req, res) => {
  console.log("hit this route");
  res.send("server root");
});

app.get("/signin", (req, res) => {
  console.log("get signin");
  res.send("signin");
});
app.post("/signin", (req, res) => {
  const user = req.body;
  console.log(user);
  const refreshToken = jwt.sign({ username: user.username }, refreshSecret, {
    algorithm: "HS256",
  });
  const accessToken = jwt.sign({ username: user.username }, accessSecret, {
    algorithm: "HS256",
    expiresIn: "20s",
  });
  res.json({ refreshToken, accessToken });
});

app.listen(port, () => {
  console.log("listening to " + port);
});
