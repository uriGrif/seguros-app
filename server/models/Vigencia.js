const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vigenciaSchema = new Schema(
	{
		Id: Number,
		Vigencia: String,
		Meses: Number
	},
	{
		versionKey: false
	}
);

module.exports = Vigencia = mongoose.model(
	"Vigencia",
	vigenciaSchema,
	"Vigencias"
);
