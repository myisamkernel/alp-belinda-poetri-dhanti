const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000

app.use(express.json());

require("./src/routes/user")(app)
require("./src/routes/dataRoute")(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})