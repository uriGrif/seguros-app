const express = require("express");
import Mes from "../models/Mes";

module.exports = mesesRouter = express.Router();

mesesRouter.get("/", (req, res) => {
	res.send("Router de los meses");
});
