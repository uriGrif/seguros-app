const express = require("express");
const mongoose = require("mongoose");
const Asegurado = require("../models/Asegurado");
const TipoPersona = require("../models/TipoPersona");

module.exports = aseguradosRouter = express.Router();

aseguradosRouter.get("/", (req, res) => {
	res.send("Router de Asegurados");
});

aseguradosRouter.get("/search", async (req, res) => {
	const searchTerm = req.query.q.toString();
	const limit = req.query.limit || 30;
	try {
		const results = await Asegurado.find(
			{ $text: { $search: searchTerm } },
			"Asegurado Observaciones Email1",
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.limit(limit);
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

aseguradosRouter.get("/search-fuzzy", async (req, res) => {
	const searchTerm = req.query.q.toString();
	try {
		const results = await Asegurado.find(
			{ $text: { $search: searchTerm } },
			{ Asegurado: 1 },
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.limit(6);
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

aseguradosRouter.post("/add", async (req, res) => {
	const data = req.body;
	try {
		const newAsegurado = await Asegurado.create(data);
		res.send(newAsegurado);
	} catch (err) {
		console.error(err);
	}
});

aseguradosRouter.put("/edit/:id", async (req, res) => {
	const updates = req.body;
	const id = req.params.id;
	try {
		const newAsegurado = await Asegurado.findByIdAndUpdate(id, updates, {
			new: true
		});
		res.send(newAsegurado);
	} catch (err) {
		console.error(err);
	}
});

aseguradosRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let results = await Asegurado.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId(id)
				}
			},
			{
				$lookup: {
					from: "TiposPersona",
					localField: "TipoPersona",
					foreignField: "_id",
					as: "tipoPersona"
				}
			},
			{
				$project: {
					"tipoPersona.Id": 0
				}
			}
		]);

		results = results["0"];
		results.tipoPersona = results.tipoPersona[0].descripcion;

		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

aseguradosRouter.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deletedAsegurado = await Asegurado.findByIdAndDelete(id);
		res.send(deletedAsegurado);
	} catch (err) {
		console.error(err);
	}
});
