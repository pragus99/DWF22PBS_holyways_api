const express = require("express");
const routers = require("./routers");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", routers);
app.use("/upload", express.static("storage"));

app.listen(9000);
