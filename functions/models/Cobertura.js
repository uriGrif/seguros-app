const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coberturaSchema = new Schema(
	{
		Id: Number,
		idPoliza: mongoose.Types.ObjectId,
		idRiesgo: mongoose.Types.ObjectId,
		Observaciones: String,
		Endoso: Number,
		Prima: Number,
		Premio: Number,
		Fecha: Date,
		ValorAsegurado: Number
	},
	{
		versionKey: false
	}
);

module.exports = Cobertura = mongoose.model(
	"Cobertura",
	coberturaSchema,
	"Coberturas"
);
