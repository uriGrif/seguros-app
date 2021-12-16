const express = require("express");
import Riesgo from "../models/Riesgo";

module.exports = riesgosRouter = express.Router();

riesgosRouter.get("/", (req, res) => {
	res.send("Router de los riesgos");
});
