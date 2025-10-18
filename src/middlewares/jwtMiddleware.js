// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  // Get token from Authorization header
  // Expected format: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get the token part

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
      message: "Please provide a valid access token in Authorization header",
    });
  }

  // Verify the token is valid and not expired
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle specific error types
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          error: "Token expired",
          message: "Your access token has expired. Please refresh your token.",
        });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({
          error: "Invalid token",
          message: "The provided token is invalid or malformed",
        });
      }

      return res.status(403).json({
        error: "Token verification failed",
        message: err.message,
      });
    }

    // Token is valid! Attach decoded user info to request
    // Now we know who the user is
    req.user = decoded;
    next();
  });
}