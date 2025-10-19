const {
  loginUser,
  registerUser,
  refreshUserToken,
  logout,
} = require("../controllers/user");

module.exports = (app) => {
  // Register new user
  app.post("/api/auth/register", registerUser);

  // Login
  app.post("/api/auth/login", loginUser);

  // Refresh token
  app.post("/api/auth/refresh", refreshUserToken);

  // Logout
  app.post("/api/auth/logout", logout);
};
