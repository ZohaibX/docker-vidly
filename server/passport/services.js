const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

module.exports = (app) => {
  // requiring passport setup setup
  require("../passport/passport-setup");

  // For an actual app you should configure this with an experation time, better keys, proxy and secure
  require("../cookies/service")(app);

  // Auth middleware that checks if the user is logged in
  const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.sendStatus(401);
    }
  };

  // Initializes passport and passport sessions
  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/good");
    }
  );
  //? we may change name of routes of /good and /failed

  app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
  });

  app.get("/", (req, res) => {
    res.send("You are not logged in");
  });
  app.get("/failed", (req, res) => res.send("You Failed To Log In"));
  app.get("/good", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`Welcome Mr ${req.user.displayName} `);
  });
};
