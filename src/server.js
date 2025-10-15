const express = require("express");

const app = express();

require("./routes/user")(app)

app.use(express.json());