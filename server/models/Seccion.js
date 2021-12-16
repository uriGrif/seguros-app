const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seccionSchema = new Schema(
	{
		Id: Number,
		Seccion: String
	},
	{
		versionKey: false
	}
);

module.exports = Seccion = mongoose.model(
	"Seccion",
	seccionSchema,
	"Secciones"
);
