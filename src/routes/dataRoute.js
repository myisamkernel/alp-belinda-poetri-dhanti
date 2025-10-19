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
  app.get("/data", authenticateToken, authorizeRole("read"), getListData);

  app.get("/data/:id", authenticateToken, getOneData);

  app.post("/data", authenticateToken, authorizeRole("write"), storeData);

  app.put("/data", authenticateToken, authorizeRole("write"), editData);

  app.delete(
    "/data/:id",
    authenticateToken,
    authorizeRole("delete"),
    deleteData
  );
  
};
