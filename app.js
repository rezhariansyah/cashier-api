require("dotenv").config();

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const xssFilter = require("x-xss-protection");
const logger = require("morgan");
const app = express();
const port = process.env.SERVER_PORT || 3333;

const whiteList = process.env.WHITELIST;

const userRoute = require("./src/routes/user");
const productRoute = require("./src/routes/product");

app.use(cors());
// app.options('*', cors(corsOptions))
app.use(xssFilter());
app.use(logger("dev"));

app.listen(port, () => {
  console.log(`\n Server is running on port : ${port} \n `);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // body type

app.use("/user", userRoute);
app.use("/product", productRoute);
