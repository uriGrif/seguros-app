const express = require("express");
import Vigencia from "../models/Vigencia";

module.exports = vigenciasRouter = express.Router();

vigenciasRouter.get("/", (req, res) => {
	res.send("Router de las vigencias");
});
