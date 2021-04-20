const express = require("express");
const routers = require("./routers");

const app = express();

app.use(express.json());
app.use("/api/v1", routers);

app.listen(9000);
