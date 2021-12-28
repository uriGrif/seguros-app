const Auth = require("./Auth.js");
const mongoose = require("mongoose");
const Poliza = require("./models/Poliza");

exports.handler = async function (event, context) {
	mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "MongoDB connection error:"));

	const getPath = event.path.split("/")[event.path.split("/").length - 2];
	const path = event.path.split("/")[event.path.split("/").length - 1];
	const body = event.body ? JSON.parse(event.body) : {};
	const tokenHeader = event.headers.authorization;

	if (tokenHeader && (await Auth.checkAuth(tokenHeader))) {
		let results;
		switch (event.httpMethod) {
			case "GET":
				if (getPath === "search") {
					results = await search(event.queryStringParameters.obs);
				} else if (getPath === "by-asegurado") {
					results = await byAsegurado(path);
				} else if (getPath === "by-nombre-asegurado") {
					results = await byNombreAsegurado(path);
				} else if (path === "listado-vencimiento") {
					results = await listadoVencimiento(
						event.queryStringParameters.month,
						event.queryStringParameters.year
					);
				} else if (path === "listado-operaciones") {
					results = await listadoOperaciones(
						event.queryStringParameters.month,
						event.queryStringParameters.year
					);
				} else {
					results = await getPoliza(path);
				}
				break;
			case "POST":
				results = await addPoliza(body);
				break;
			case "PUT":
				results = await editPoliza(body, path);
				break;
			case "DELETE":
				results = await deletePoliza(path);
				break;
		}

		// mongoose.disconnect();

		return {
			statusCode: 200,
			body: JSON.stringify(results)
		};
	} else {
		return {
			statusCode: 401,
			body: JSON.stringify({
				message: "Debe estar logueado para ver esto"
			})
		};
	}
};

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

const listadoVencimientoProjection = {
	_id: 0,
	f_Inicio: 1,
	f_Vencimiento: 1,
	NroPoliza: 1,
	Observaciones: 1,
	Prima: 1,
	Premio: 1,
	ValorAsegurado: 1,
	NombreAsegurado: 1,
	compania: { $arrayElemAt: ["$compania.Compania", 0] },
	seccion: { $arrayElemAt: ["$seccion.Seccion", 0] },
	productor: { $arrayElemAt: ["$productor.Productor", 0] }
};

const listadoOperacionesProjection = {
	_id: 0,
	FechaSolicitud: 1,
	f_Inicio: 1,
	f_Vencimiento: 1,
	NroPoliza: 1,
	Observaciones: 1,
	Prima: 1,
	Premio: 1,
	Comision: 1,
	Art: 1,
	Patrimoniales: 1,
	Capitas: 1,
	Siniestros: 1,
	PatenteVehiculo: 1,
	ValorAsegurado: 1,
	RAutomatica: 1,
	Baja: 1,
	FechaRegistro: 1,
	NombreAsegurado: 1,
	Documento: { $arrayElemAt: ["$asegurado.Documento", 0] },
	Cuit: { $arrayElemAt: ["$asegurado.Cuit", 0] },
	Domicilio: { $arrayElemAt: ["$asegurado.Domicilio", 0] },
	Localidad: { $arrayElemAt: ["$asegurado.Localidad", 0] },
	CodPostal: { $arrayElemAt: ["$asegurado.CodPostal", 0] },
	compania: { $arrayElemAt: ["$compania.Compania", 0] },
	seccion: { $arrayElemAt: ["$seccion.Seccion", 0] },
	productor: { $arrayElemAt: ["$productor.Productor", 0] },
	medioDePago: {
		$arrayElemAt: ["$medioDePago.Descripcion", 0]
	},
	vigencia: { $arrayElemAt: ["$vigencia.Vigencia", 0] },
	motivoBaja: { $arrayElemAt: ["$motivoBaja.MotivoBaja", 0] }
};

const search = async observaciones => {
	const limit = 30;
	try {
		let results = await Poliza.find(
			{ $text: { $search: observaciones } },
			"NroPoliza Observaciones idSeccion f_Inicio f_Vencimiento",
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.limit(limit);
		return results;
	} catch (err) {
		console.error(err);
	}
};

const byAsegurado = async aseguradoId => {
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

		return results;
	} catch (err) {
		console.error(err);
	}
};

const byNombreAsegurado = async n => {
	nombre = n.replace(/%20/g, " ");
	try {
		const results = await Poliza.find(
			{ NombreAsegurado: nombre },
			"NroPoliza Observaciones NombreAsegurado"
		);
		return results;
	} catch (err) {
		console.error(err);
	}
};

const getPoliza = async id => {
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

		return results[0];
	} catch (err) {
		console.error(err);
	}
};

const listadoVencimiento = async (month, year) => {
	const from = new Date(year, month - 1, 1).toISOString().split("T")[0];
	const to = new Date(year, month, 0).toISOString().split("T")[0];

	try {
		let results = await Poliza.aggregate([
			{
				$match: { f_Vencimiento: { $gte: from, $lte: to } }
			},
			...foreginKeysLookups,
			{
				$project: listadoVencimientoProjection
			},
			{
				$sort: { f_Vencimiento: 1 }
			}
		]);

		return results;
	} catch (err) {
		console.error(err);
	}
};

const listadoOperaciones = async (month, year) => {
	const from = new Date(year, month - 1, 1).toISOString().split("T")[0];
	const to = new Date().toISOString().split("T")[0];

	try {
		let results = await Poliza.aggregate([
			{
				$match: { FechaSolicitud: { $gte: from, $lte: to } }
			},
			{
				$lookup: {
					from: "Asegurados",
					localField: "idAsegurado",
					foreignField: "_id",
					as: "asegurado"
				}
			},
			...foreginKeysLookups,
			{
				$project: listadoOperacionesProjection
			},
			{
				$sort: { FechaSolicitud: 1 }
			}
		]);

		return results;
	} catch (err) {
		console.error(err);
	}
};

const editPoliza = async (updates, id) => {
	try {
		const newPoliza = await Poliza.findByIdAndUpdate(id, updates, {
			new: true
		});
		return newPoliza;
	} catch (err) {
		console.error(err);
	}
};

const addPoliza = async data => {
	try {
		const newPoliza = await Poliza.create(data);
		return newPoliza;
	} catch (err) {
		console.error(err);
	}
};

const deletePoliza = async id => {
	try {
		const deletedPoliza = await Poliza.findByIdAndDelete(id);
		return deletedPoliza;
	} catch (err) {
		console.error(err);
	}
};
