const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000

app.use(express.json());

require("./routes/user")(app)
require("./routes/dataRoute")(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})