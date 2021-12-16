const express = require("express");
import RD_TipoPersona from "../models/RD_TipoPersona";

module.exports = tiposPersonaRouter = express.Router();

tiposPersonaRouter.get("/", (req, res) => {
	res.send("Router de los tipos de persona");
});
