const MongoStore = require("connect-mongo");
mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_STRING,
});

function configSession() {
  console.log("configuring session");
  const isProduction = process.env.NODE_ENV === "production";
  console.log("Node env production settings set to: " + isProduction);
  return (config = {
    secret: process.env.SESSION_SECRET,
    resave: false,

    saveUninitialized: false,
    cookie: {
      secure: isProduction ? true : false,
      httpOnly: true,
      sameSite: isProduction ? "none" : false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  });
}

module.exports = configSession();
//change
