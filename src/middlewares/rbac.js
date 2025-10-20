const { rolesPermissions } = require("../../statics/constant");

// Middleware to check user role
function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    if (!rolesPermissions[req.user.role].includes(...allowedRoles)) {
      return res.status(403).json({ error: "Forbidden user role " + req.user.role + " username " + req.user.username });
    }
    next();
  };
}

module.exports ={
  authorizeRole,
}