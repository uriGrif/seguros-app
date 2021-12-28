const Auth = require("./Auth.js");
const mongoose = require("mongoose");
const Cobertura = require("./models/Cobertura");

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
				if (getPath === "by-poliza") {
					results = await getCoberturasByPoliza(path);
				} else {
					results = await getCobertura(path);
				}
				break;
			case "POST":
				results = await addCobertura(body);
				break;
			case "PUT":
				results = await editCobertura(body, path);
				break;
			case "DELETE":
				results = await deleteCobertura(path);
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

const getCoberturasByPoliza = async polizaId => {
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
		return results;
	} catch (err) {
		console.error(err);
	}
};

const getCobertura = async id => {
	try {
		const results = await Cobertura.findById(id);
		return results;
	} catch (err) {
		console.error(err);
	}
};

const addCobertura = async data => {
	try {
		const newCobertura = await Cobertura.create(data);
		return newCobertura;
	} catch (err) {
		console.error(err);
	}
};

const editCobertura = async (updates, id) => {
	try {
		const newCobertura = await Cobertura.findByIdAndUpdate(id, updates, {
			new: true
		});
		return newCobertura;
	} catch (err) {
		console.error(err);
	}
};

const deleteCobertura = async id => {
	try {
		const deletedCobertura = await Cobertura.findByIdAndDelete(id);
		return deletedCobertura;
	} catch (err) {
		console.error(err);
	}
};
