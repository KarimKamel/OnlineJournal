const MongoStore = require("connect-mongo");
mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_STRING,
});

function configSession(session) {
  console.log("configuring session");
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,

    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,

      // maxAge: 1000 * 60 * 60 * 24 * 365,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  });
}
module.exports = configSession;
