const { data } = require("../../statics/constant");
const { authorizeAbacData } = require("../middlewares/abac");
let { nextId } = require("../../statics/constant");

const getListData = (req, res) => {
  res.json(data);
};

const getDataID = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid ID: must be a positive integer" });
  }

  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  return index;
};

const getOneData = (req, res) => {
  const dataId = getDataID(req, res);

  authorizeAbacData(req, res, data[dataId]);

  res.json(data[dataId]);
};

const storeData = (req, res) => {
  if (
    !req.body ||
    !req.body.name ||
    typeof req.body.name !== "string" ||
    req.body.name.trim() === ""
  ) {
    return res.status(400).json({
      error: "Invalid input: name is required and must be a non-empty string",
    });
  }
  const newItem = {
    id: nextId++,
    name: req.body.name.trim(),
    created_by: req.user.id,
  };
  data.push(newItem);
  return res.status(201).json(newItem);
};

const deleteData = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid ID: must be a positive integer" });
  }
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  data.splice(index, 1);
  res.json({ message: "Item deleted" });
};

const editData = (req, res) => {
  const dataId = getDataID(req, res);

  authorizeAbacData(req, res, data[dataId]);

  data[dataId].name = req.body.name;

  res.json({ message: "Item name changed" });
};

module.exports = {
  getListData,
  getOneData,
  storeData,
  editData,
  deleteData,
};
