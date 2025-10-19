const {
  getListData,
  storeData,
  deleteData,
} = require("../controllers/data");
const { authorizeAbac } = require("../middlewares/abac");
const { authenticateToken } = require("../middlewares/jwtMiddleware");
const { authorizeRole } = require("../middlewares/rbac");

module.exports = (app) => {
  app.get("/data", authenticateToken, authorizeAbac, getListData);

  app.post("/data", authenticateToken, authorizeRole("write"), storeData);

  app.put("/data", authenticateToken, authorizeRole("write"), storeData);

  app.delete(
    "/data/:id",
    authenticateToken,
    authorizeRole("delete"),
    deleteData
  );
  
};
