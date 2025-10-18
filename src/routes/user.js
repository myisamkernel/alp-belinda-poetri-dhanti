const jwt = require("jsonwebtoken"); // Library to create and verify JWT tokens
const bcrypt = require("bcryptjs"); // Library to hash passwords securely
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/jwt");
const {
  loginUser,
  registerUser,
  refreshUserToken,
} = require("../controllers/user");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to JWT Authentication Demo API",
      version: "1.0.0",
      endpoints: {
        auth: {
          register: "POST /auth/register",
          login: "POST /auth/login",
          refresh: "POST /auth/refresh",
          logout: "POST /auth/logout",
        },
        user: {
          profile: "GET /user/profile",
          updateProfile: "PUT /user/profile",
        },
        data: {
          list: "GET /data",
          create: "POST /data",
          update: "PUT /data/:id",
          delete: "DELETE /data/:id",
        },
      },
    });
  });

  // Register new user
  app.post("/auth/register", registerUser);

  // Login
  app.post("/auth/login", loginUser);

  // Refresh token
  app.post("/auth/refresh", refreshUserToken);

  // Logout
  app.post("/auth/logout", logout);
};
