const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tipoPersonaSchema = new Schema(
	{
		Id: Number,
		descripcion: String
	},
	{
		versionKey: false
	}
);

module.exports = RD_TipoPersona = mongoose.model(
	"TipoPersona",
	tipoPersonaSchema,
	"TiposPersona"
);
