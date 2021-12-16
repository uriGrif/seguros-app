const express = require("express");
import MedioDePago from "../models/MedioDePago";

module.exports = mediosDePagoRouter = express.Router();

mediosDePagoRouter.get("/", (req, res) => {
	res.send("Router de los medios de pago");
});
