const MongoStore = require("connect-mongo");
mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_STRING,
});

function configSession(session) {
  session({
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
  console.log(process.env.Node_ENV);
  console.log("#########################");
  if (process.env.NODE_ENV === "production") {
    console.log("secure cookie switched on");
    sess.cookie.secure = true;
  }

  return session;
}
module.exports = configSession;
