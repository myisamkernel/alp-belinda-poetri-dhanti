const passport = require("passport");
const {
  loginUser,
  registerUser,
  refreshUserToken,
  logout,
} = require("../controllers/user");
const { authenticateToken } = require("../middlewares/jwtMiddleware");

module.exports = (app) => {
  // Register new user
  app.post("/api/auth/register", registerUser);

  // Login
  app.post("/api/auth/login", loginUser);

  // Refresh token
  app.post("/api/auth/refresh", refreshUserToken);

  // Logout
  app.post("/api/auth/logout", logout);

  app.get("/api/auth/verify", authenticateToken, (req, res) => {
    res.json({ valid: true, user: req.user });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // OAuth callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login-failed",
    }),
    (req, res) => {
      res.render("dashboard",{title:"dashboard"});
    }
  );
};
