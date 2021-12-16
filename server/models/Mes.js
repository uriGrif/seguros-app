const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mesSchema = new Schema(
	{
		Id: Number,
		Mes: String
	},
	{
		versionKey: false
	}
);

module.exports = Mes = mongoose.model("Mes", mesSchema, "Meses");
