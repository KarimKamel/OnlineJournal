const MongoStore = require("connect-mongo");
mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_CONNECTION_STRING,
});

function configSession() {
  console.log("configuring session");
  return (config = {
    secret: process.env.SESSION_SECRET,
    resave: true,

    saveUninitialized: false,
    // cookie: {
    //   secure: false,
    //   httpOnly: false,
    //   sameSite: false,

    //   maxAge: 1000 * 60 * 60 * 24 * 365,
    // },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  });
}

module.exports = configSession();
