const Auth = require("./Auth.js");
const mongoose = require("mongoose");
const Asegurado = require("./models/Asegurado");

exports.handler = async function (event, context) {
	mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "MongoDB connection error:"));

	const path = event.path.split("/")[event.path.split("/").length - 1];
	const body = event.body ? JSON.parse(event.body) : {};
	const tokenHeader = event.headers.authorization;

	if (tokenHeader && (await Auth.checkAuth(tokenHeader))) {
		let results;
		switch (event.httpMethod) {
			case "GET":
				if (path === "search") {
					results = await search(event.queryStringParameters.q);
				} else if (path === "search-fuzzy") {
					results = await searchFuzzy(event.queryStringParameters.q);
				} else {
					results = await getAsegurado(path);
				}
				break;
			case "POST":
				results = await addAsegurado(body);
				break;
			case "PUT":
				results = await editAsegurado(body, path);
				break;
			case "DELETE":
				results = await deleteAsegurado(path);
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

const search = async searchTerm => {
	const limit = 30;
	try {
		const results = await Asegurado.find(
			{ $text: { $search: searchTerm } },
			"Asegurado Observaciones Email1",
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.limit(limit);
		return results;
	} catch (err) {
		console.error(err);
	}
};

const searchFuzzy = async searchTerm => {
	try {
		const results = await Asegurado.find(
			{ $text: { $search: searchTerm } },
			{ Asegurado: 1 },
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.limit(6);
		return results;
	} catch (err) {
		console.error(err);
	}
};

const addAsegurado = async data => {
	try {
		const newAsegurado = await Asegurado.create(data);
		return newAsegurado;
	} catch (err) {
		console.error(err);
	}
};

const editAsegurado = async (updates, id) => {
	try {
		const newAsegurado = await Asegurado.findByIdAndUpdate(id, updates, {
			new: true
		});
		return newAsegurado;
	} catch (err) {
		console.error(err);
	}
};

const getAsegurado = async id => {
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
		results.tipoPersona = results.tipoPersona[0]
			? results.tipoPersona[0].descripcion
			: "";

		return results;
	} catch (err) {
		console.error(err);
	}
};

const deleteAsegurado = async id => {
	try {
		const deletedAsegurado = await Asegurado.findByIdAndDelete(id);
		return deletedAsegurado;
	} catch (err) {
		console.error(err);
	}
};
