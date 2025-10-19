const jwt = require("jsonwebtoken"); // Library to create and verify JWT tokens
const bcrypt = require("bcryptjs"); // Library to hash passwords securely
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { users, refreshTokens } = require("../../statics/constant");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/jwt");

// Generate access token (short-lived)
function generateAccessToken(user) {
  // Payload = data stored inside the token
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  // Create and sign the token
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN, // Token expires in 1 hour
    issuer: "jwt-demo-app", // Who created the token
    audience: "jwt-demo-users", // Who the token is for
  });
}

// Generate refresh token (long-lived)
function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    type: "refresh", // Mark this as a refresh token
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Refresh token valid for 7 days
    issuer: "jwt-demo-app",
  });
}

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Username, password, and email are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Invalid password",
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if username already exists
    if (users.find((u) => u.username === username)) {
      return res.status(409).json({
        error: "User already exists",
        message: "Username is already taken",
      });
    }

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      return res.status(409).json({
        error: "Email already exists",
        message: "Email is already registered",
      });
    }

    // Hash the password using bcrypt
    // 10 = salt rounds (how many times to hash)
    // More rounds = more secure but slower
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      passwordHash,
      email,
      role: "user", // Default role
    };

    users.push(newUser);

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    refreshTokens.add(refreshToken);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      error: "Registration failed",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Username and password are required",
      });
    }

    // Find user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Username or password is incorrect",
      });
    }

    // Verify password using bcrypt.compare()
    // This compares the plain text password with the hashed password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Username or password is incorrect",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.add(refreshToken);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
      message: error.message,
    });
  }
};

const refreshUserToken = () => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      error: "Refresh token required",
      message: "Please provide a refresh token",
    });
  }

  // Check if refresh token is in our store
  if (!refreshTokens.has(refreshToken)) {
    return res.status(403).json({
      error: "Invalid refresh token",
      message: "The refresh token is invalid or has been revoked",
    });
  }

  // Verify refresh token
  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Remove invalid token from store
      refreshTokens.delete(refreshToken);

      return res.status(403).json({
        error: "Invalid refresh token",
        message: "The refresh token is invalid or expired",
      });
    }

    // Find user
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      refreshTokens.delete(refreshToken);
      return res.status(403).json({
        error: "User not found",
        message: "User associated with this token no longer exists",
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user);

    res.json({
      message: "Token refreshed successfully",
      accessToken,
    });
  });
};

const logout = (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    refreshTokens.delete(refreshToken);
  }

  res.json({
    message: "Logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  refreshUserToken,
  logout,
};
