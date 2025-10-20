const { checkOutsideWorkingHour } = require("../util/workingHour");

const authorizeAbacData = (req, res, data) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }

  if (data.created_by != req.user.id || checkOutsideWorkingHour(req.user.startShift,req.user.endShift)) {
    
    console.log(req.user)
    
    res
      .status(401)
      .json({
        error: "Unauthorized role : " + req.user.role + " username : " + req.user.username + " working hour : " + req.user.startShift + " to " + req.user.endShift,
      });
    return false;
  }

  return true;
};

module.exports = {
  authorizeAbacData,
};
