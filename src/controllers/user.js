const jwt = require("jsonwebtoken"); // Library to create and verify JWT tokens
const bcrypt = require("bcryptjs"); // Library to hash passwords securely
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
    startShift: user.startShift,
    endShift: user.endShift,
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
        role: user.role,
        email: user.email,
        startShift: user.startShift,
        endShift: user.endShift,
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

const refreshUserToken = (req, res) => {
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
  loginUser,
  refreshUserToken,
  logout,
  generateAccessToken,
  generateRefreshToken,
};
