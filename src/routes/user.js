const passport = require("passport");
const {
  loginUser,
  refreshUserToken,
  logout,
  generateAccessToken,
  generateRefreshToken,
} = require("../controllers/user");
const { authenticateToken } = require("../middlewares/jwtMiddleware");

module.exports = (app) => {

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

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login-failed" }),
    async (req, res) => {
      try {
        const user = req.user;

        // Generate tokens based on the matched user
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Render the token-setup bridge page
        res.render("google-callback", {
          title: "Google Login Success",
          accessToken,
          refreshToken,
          user,
        });
      } catch (err) {
        console.error("OAuth callback error:", err);
        res.redirect("/login-failed");
      }
    }
  );
};
