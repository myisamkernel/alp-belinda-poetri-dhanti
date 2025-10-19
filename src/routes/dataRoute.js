const {
  getListData,
  storeData,
  deleteData,
  editData,
} = require("../controllers/data");
const { authorizeAbac } = require("../middlewares/abac");
const { authenticateToken } = require("../middlewares/jwtMiddleware");
const { authorizeRole } = require("../middlewares/rbac");

module.exports = (app) => {
  app.get("/data", authenticateToken, authorizeRole("read"), getListData);

  app.post("/data", authenticateToken, authorizeRole("write"), storeData);

  app.put("/data", authenticateToken, authorizeRole("write"), editData);

  app.delete(
    "/data/:id",
    authenticateToken,
    authorizeRole("delete"),
    deleteData
  );
  
};
