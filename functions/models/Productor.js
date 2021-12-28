const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productorSchema = new Schema(
	{
		Id: Number,
		Asegurador: String,
		Matricula: String
	},
	{
		versionKey: false
	}
);

module.exports = Productor = mongoose.model(
	"Productor",
	productorSchema,
	"Productores"
);
