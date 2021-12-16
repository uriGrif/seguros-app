const express = require("express");
import Seccion from "../models/Seccion";

module.exports = seccionesRouter = express.Router();

seccionesRouter.get("/", (req, res) => {
	res.send("Router de las secciones");
});
