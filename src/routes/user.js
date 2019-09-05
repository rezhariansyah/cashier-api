const express = require("express");
const Route = express.Router();

const userController = require("../controllers/user");
const Auth = require("../helpers/auth");

Route
    .all("/*", Auth.authInfo)
    .get("/", userController.getUsers)
    .get("/:userid", userController.userDetail)
    .post("/register", userController.register)
    .post("/login", userController.login);

module.exports = Route;
