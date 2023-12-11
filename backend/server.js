const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const homepage = require("./routes/home");
const { join } = require("path");
const fs = require("fs");
const register = require("./routes/users");
const login = require("./routes/login");

app.use(express.json());
app.use(cors());
if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}
app.use(helmet());
app.use(compression({}));
app.use("/public/images", express.static(__dirname + "/public/images/"));
app.use("/home", homepage);
app.use("/register", register);
app.use("/login", login);

async function start() {
  try {
    await mongoose.connect(cluster, { useNewUrlParser: true });
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (err) {
    console.error(err);
  }
}

start();
