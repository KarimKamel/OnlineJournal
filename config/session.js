const MongoStore = require("connect-mongo");
mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_STRING,
});

function configSession(session) {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,

    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING,
      }),
      // maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  });
}
module.exports = configSession;
