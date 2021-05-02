const MongoStore = require("connect-mongo");
mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_STRING,
});

function configSession() {
  console.log("configuring session");
  var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  return (config = {
    secret: process.env.SESSION_SECRET,
    resave: false,

    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      expires: expiryDate,
      // sameSite: "none",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  });
}

module.exports = configSession();
