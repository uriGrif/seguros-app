const express = require("express");
const mongoose = require("mongoose");
const Asegurado = require("../models/Asegurado");
const Poliza = require("../models/Poliza");

module.exports = polizasRouter = express.Router();

polizasRouter.get("/", (req, res) => {
	res.send("Router de las polizas");
});

polizasRouter.get("/search", async (req, res) => {
	const observaciones = req.query.obs.toString() || "";
	const limit = req.query.limit || 30;
	try {
		let results = await Poliza.find(
			{ $text: { $search: observaciones } },
			"NroPoliza Observaciones idSeccion f_Inicio f_Vencimiento",
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.limit(limit);
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

polizasRouter.get("/by-asegurado/:aId", async (req, res) => {
	const aseguradoId = req.params.aId;
	try {
		let results = await Poliza.aggregate([
			{
				$match: { idAsegurado: mongoose.Types.ObjectId(aseguradoId) }
			},
			{
				$lookup: {
					from: "Secciones",
					localField: "idSeccion",
					foreignField: "_id",
					as: "seccion"
				}
			},
			{
				$project: {
					NroPoliza: 1,
					Observaciones: 1,
					seccion: 1,
					f_Inicio: 1,
					f_Vencimiento: 1
				}
			},
			{
				$sort: { f_Inicio: -1 }
			}
		]);

		results.map(
			r => (r.seccion = r.seccion[0] ? r.seccion[0].Seccion : "")
		);
		// const results = await Poliza.find(
		// 	{ idAsegurado: mongoose.Types.ObjectId(aseguradoId) },
		// 	"NroPoliza Observaciones idSeccion f_Inicio f_Vencimiento"
		// ).sort({ f_Inicio: -1 });
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

polizasRouter.get("/by-numero/:nro", async (req, res) => {
	const numero = req.params.nro;
	try {
		const results = await Poliza.find(
			{ NroPoliza: numero },
			"NroPoliza Observaciones idSeccion f_Inicio f_Vencimiento"
		);
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

polizasRouter.get("/by-nombre-asegurado/:nombre", async (req, res) => {
	const nombre = req.params.nombre;
	try {
		const results = await Poliza.find(
			{ NombreAsegurado: nombre },
			"NroPoliza Observaciones NombreAsegurado"
		);
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

polizasRouter.post("/add", async (req, res) => {
	const data = req.body;
	try {
		const newPoliza = await Poliza.create(data);
		res.send(newPoliza);
	} catch (err) {
		console.error(err);
	}
});

polizasRouter.put("/edit/:id", async (req, res) => {
	const updates = req.body;
	const id = req.params.id;
	try {
		const newPoliza = await Poliza.findByIdAndUpdate(id, updates, {
			new: true
		});
		res.send(newPoliza);
	} catch (err) {
		console.error(err);
	}
});

const foreginKeysLookups = [
	{
		$lookup: {
			from: "Secciones",
			localField: "idSeccion",
			foreignField: "_id",
			as: "seccion"
		}
	},
	{
		$lookup: {
			from: "Companias",
			localField: "idCompania",
			foreignField: "_id",
			as: "compania"
		}
	},
	{
		$lookup: {
			from: "Productores",
			localField: "idProductor",
			foreignField: "_id",
			as: "productor"
		}
	},
	{
		$lookup: {
			from: "Vigencias",
			localField: "idVigencia",
			foreignField: "_id",
			as: "vigencia"
		}
	},
	{
		$lookup: {
			from: "MediosDePago",
			localField: "idMPago",
			foreignField: "_id",
			as: "medioDePago"
		}
	},
	{
		$lookup: {
			from: "MotivosBaja",
			localField: "idMotivoBaja",
			foreignField: "_id",
			as: "motivoBaja"
		}
	}
];

polizasRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let results = await Poliza.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId(id)
				}
			},
			...foreginKeysLookups,
			{
				$project: {
					"seccion.Id": 0,
					"seccion.rd_id": 0,
					"compania.Id": 0,
					"productor.Id": 0,
					"vigencia.Id": 0,
					"medioDePago.Id": 0,
					"motivoBaja.Id": 0
				}
			}
		]);

		results = results["0"];
		results.seccion = results.seccion[0] ? results.seccion[0].Seccion : "";
		results.compania = results.compania[0]
			? results.compania[0].Compania
			: "";
		results.productor = results.productor[0]
			? results.productor[0].Asegurador
			: "";
		results.vigencia = results.vigencia[0]
			? results.vigencia[0].Vigencia
			: "";
		results.medioDePago = results.medioDePago[0]
			? results.medioDePago[0].Descripcion
			: "";
		results.motivoBaja = results.motivoBaja[0]
			? results.motivoBaja[0].MotivoBaja
			: "";

		res.send(results);
	} catch (err) {
		console.error(err);
	}
});
