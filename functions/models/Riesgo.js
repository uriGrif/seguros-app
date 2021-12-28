const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const riesgoSchema = new Schema(
	{
		Id: Number,
		Riesgo: String
	},
	{
		versionKey: false
	}
);

module.exports = Riesgo = mongoose.model("Riesgo", riesgoSchema, "Riesgos");
