const { authenticateToken } = require("../middlewares/jwtMiddleware");
const { authorizeRole } = require("../middlewares/rbac");

module.exports = (app) => {
  app.get("/data", authenticateToken, authorizeRole("read"), (req, res) => {
    res.render("data", { title: "data" });
  });
};
