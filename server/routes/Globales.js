const express = require("express");
const MedioDePago = require("../models/MedioDePago");
const Compania = require("../models/Compania");
const Mes = require("../models/Mes");
const MotivoBaja = require("../models/MotivoBaja");
const Productor = require("../models/Productor");
const TipoPersona = require("../models/TipoPersona");
const Riesgo = require("../models/Riesgo");
const Seccion = require("../models/Seccion");
const Vigencia = require("../models/Vigencia");

module.exports = globalesRouter = express.Router();

globalesRouter.get("/", async (req, res) => {
	try {
		let mediosDePago = await MedioDePago.find();
		let companias = await Compania.find().sort({ Compania: 1 });
		let meses = await Mes.find().sort({ Id: 1 });
		let motivosBaja = await MotivoBaja.find();
		let productores = await Productor.find();
		let TipoPersona = await TipoPersona.find();
		let riesgos = await Riesgo.find().sort({ Riesgo: 1 });
		let seccion = await Seccion.find().sort({ Seccion: 1 });
		let vigencia = await Vigencia.find();
		let result = {
			mediosDePago,
			companias,
			meses,
			motivosBaja,
			productores,
			rd_TipoPersona,
			riesgos,
			seccion,
			vigencia
		};
		res.send(JSON.stringify(result));
	} catch (error) {}
});
