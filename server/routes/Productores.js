const express = require("express");
import Productor from "../models/Productor";

module.exports = productoresRouter = express.Router();

productoresRouter.get("/", (req, res) => {
	res.send("Router de los productores");
});
