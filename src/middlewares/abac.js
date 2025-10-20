const authorizeAbacData = (req, res, data) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }

  if (data.created_by != req.user.id) {
    res
      .status(401)
      .json({
        error: "Unauthorized role : " + req.user.role + " username : " + req.user.username,
      });
    return false;
  }

  return true;
};

module.exports = {
  authorizeAbacData,
};
