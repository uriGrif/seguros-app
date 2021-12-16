const express = require("express");
const mongoose = require("mongoose");
const Asegurado = require("../models/Asegurado");
const Poliza = require("../models/Poliza");

module.exports = polizasRouter = express.Router();

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

const projectionObject = {
	Id: 1,
	FechaSolicitud: 1,
	f_Inicio: 1,
	f_Vencimiento: 1,
	NroPoliza: 1,
	idAsegurado: 1,
	Observaciones: 1,
	Prima: 1,
	Premio: 1,
	Comision: 1,
	idSeccion: 1,
	idCompania: 1,
	idProductor: 1,
	idVigencia: 1,
	idMPago: 1,
	Art: 1,
	Patrimoniales: 1,
	Capitas: 1,
	Siniestros: 1,
	PatenteVehiculo: 1,
	ValorAsegurado: 1,
	RAutomatica: 1,
	Baja: 1,
	idMotivoBaja: 1,
	FechaRegistro: 1,
	NombreAsegurado: 1,
	compania: { $arrayElemAt: ["$compania.Compania", 0] },
	seccion: { $arrayElemAt: ["$seccion.Seccion", 0] },
	productor: { $arrayElemAt: ["$productor.Productor", 0] },
	medioDePago: {
		$arrayElemAt: ["$medioDePago.Descripcion", 0]
	},
	vigencia: { $arrayElemAt: ["$vigencia.Vigencia", 0] },
	motivoBaja: { $arrayElemAt: ["$motivoBaja.MotivoBaja", 0] }
};

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
			...foreginKeysLookups,
			{
				$project: projectionObject
			},
			{
				$sort: { f_Inicio: -1 }
			}
		]);

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

polizasRouter.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const deletedPoliza = await Poliza.findByIdAndDelete(id);
		res.send(deletedPoliza);
	} catch (err) {
		console.error(err);
	}
});

polizasRouter.get("/listado-vencimiento", async (req, res) => {
	const month = req.query.month.toString() || "";
	const year = req.query.year.toString() || "";

	const from = new Date(year, month - 1, 1).toISOString().split("T")[0];
	const to = new Date(year, month, 0).toISOString().split("T")[0];

	try {
		let results = await Poliza.aggregate([
			{
				$match: { f_Vencimiento: { $gte: from, $lte: to } }
			},
			...foreginKeysLookups,
			{
				$project: projectionObject
			},
			{
				$sort: { f_Vencimiento: 1 }
			}
		]);

		// const results = await Poliza.find(
		// 	{ idAsegurado: mongoose.Types.ObjectId(aseguradoId) },
		// 	"NroPoliza Observaciones idSeccion f_Inicio f_Vencimiento"
		// ).sort({ f_Inicio: -1 });
		res.send(results);
	} catch (err) {
		console.error(err);
	}
});

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
				$project: projectionObject
			}
		]);

		res.send(results[0]);
	} catch (err) {
		console.error(err);
	}
});
