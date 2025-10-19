const { data } = require("../../statics/constant");


const getListData = (req,res)=>{
  res.json(data);
}

const storeData = (req, res) => {
  if (!req.body || !req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    return res.status(400).json({ error: 'Invalid input: name is required and must be a non-empty string' });
  }
  const newItem = { id: nextId++, name: req.body.name.trim(),created_by:req.user.id };
  data.push(newItem);
  res.status(201).json(newItem);
}

const deleteData = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid ID: must be a positive integer' });
  }
  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  data.splice(index, 1);
  res.json({ message: 'Item deleted' });
}

const editData = (req,res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid ID: must be a positive integer' });
  }

  const index = data.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  data[index].name = req.body.name

  res.json({ message: 'Item name changed' });
}

module.exports = {
    getListData,
    storeData,
    editData,
    deleteData
}