const {
  getListData,
  storeData,
  deleteData,
  editData,
  getOneData,
} = require("../controllers/data");
const { authenticateToken } = require("../middlewares/jwtMiddleware");
const { authorizeRole } = require("../middlewares/rbac");

module.exports = (app) => {
  app.get("/api/data", authenticateToken, authorizeRole("read"), getListData);

  app.get("/api/data/:id", authenticateToken, getOneData);

  app.post("/api/data", authenticateToken, authorizeRole("write"), storeData);

  app.put("/api/data/:id", authenticateToken, authorizeRole("write"), editData);

  app.delete(
    "/api/data/:id",
    authenticateToken,
    authorizeRole("delete"),
    deleteData
  );
  
};