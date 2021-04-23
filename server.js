const express = require("express");
const routers = require("./routers");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api/v1", routers);

app.listen(9000);
