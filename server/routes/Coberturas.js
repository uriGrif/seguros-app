const express = require("express");
const Cobertura = require("../models/Cobertura");
const mongoose = require("mongoose");

module.exports = coberturasRouter = express.Router();

coberturasRouter.get("/", (req, res) => {
	res.send("Router de las coberturas");
});

coberturasRouter.get("/by-poliza/:pId", async (req, res) => {
	const polizaId = req.params.pId;
	try {
		let results = await Cobertura.aggregate([
			{
				$match: { idPoliza: mongoose.Types.ObjectId(polizaId) }
			},
			{
				$lookup: {
					from: "Riesgos",
					localField: "idRiesgo",
					foreignField: "_id",
					as: "riesgo"
				}
			}
		]);

		results.map(r => (r.riesgo = r.riesgo[0] ? r.riesgo[0].Riesgo : ""));
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

coberturasRouter.post("/add", async (req, res) => {
	const data = req.body;
	try {
		const newCobertura = await Cobertura.create(data);
		res.send(newCobertura);
	} catch (err) {
		console.error(err);
	}
});

coberturasRouter.put("/edit/:id", async (req, res) => {
	const updates = req.body;
	const id = req.params.id;
	try {
		const newCobertura = await Cobertura.findByIdAndUpdate(id, updates, {
			new: true
		});
		res.send(newCobertura);
	} catch (err) {
		console.error(err);
	}
});

coberturasRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const results = await Cobertura.findById(id);
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});
