const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediosDePagoSchema = new Schema(
	{
		Id: Number,
		Descripcion: String
	},
	{
		versionKey: false
	}
);

module.exports = MedioDePago = mongoose.model(
	"MedioDePago",
	mediosDePagoSchema,
	"MediosDePago"
);
