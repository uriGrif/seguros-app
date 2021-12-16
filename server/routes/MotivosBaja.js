const express = require("express");
import MotivoBaja from "../models/MotivoBaja";

module.exports = motivosBajaRouter = express.Router();

motivosBajaRouter.get("/", (req, res) => {
	res.send("Router de los motivos de baja");
});
