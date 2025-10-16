const express = require("express");

const app = express();
const port = 3000

require("./routes/user")(app)

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})