require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const {
  SESSION_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL,
} = require("./config/oauth");

const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));
app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: ["profile", "email"],
      prompt: "select_account consent",
      accessType: "offline",
    },
    function (accessToken, refreshToken, profile, done) {
      const user = {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos[0].value,
        provider: "google",
      };

      return done(null, user);
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

require("./src/routes/user")(app);
require("./src/routes/dataRoute")(app);
require("./src/routes/userViewRoute")(app);
require("./src/routes/dataViewRoute")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
