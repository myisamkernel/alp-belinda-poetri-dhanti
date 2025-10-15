// Middleware to check user role
function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    // Make sure user is authenticated first
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user's role is in the allowed roles list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden",
        message: `This action requires one of the following roles: ${allowedRoles.join(
          ", "
        )}`,
      });
    }

    next();
  };
}

// Middleware to check data ownership
function checkOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  // Admins can access anything
  if (req.user.role === "admin") {
    req.item = item;
    return next();
  }

  // Regular users can only access their own items
  if (item.owner !== req.user.username) {
    return res.status(403).json({
      error: "Forbidden",
      message: "You can only access items you own",
    });
  }

  req.item = item;
  next();
}