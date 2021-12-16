const express = require("express");
import Compania from "../models/Compania.js";

module.exports = companiasRouter = express.Router();

companiasRouter.get("/", (req, res) => {
	res.send("Router de las companias");
});
