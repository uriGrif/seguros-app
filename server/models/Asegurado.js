const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aseguradoSchema = new Schema(
	{
		Id: Number,
		Asegurado: String,
		NombreContacto: String,
		Sexo: String,
		FechaNacimiento: String,
		Cuit: String,
		Documento: String,
		Domicilio: String,
		Localidad: String,
		CodPostal: String,
		TelefonoLaboral: String,
		TelefonoParticular: String,
		Celular: String,
		Email1: String,
		Email2: String,
		Observaciones: String,
		Patrimoniales: Boolean,
		ART: Boolean,
		ValorAsegurado: Number,
		TipoPersona: mongoose.Types.ObjectId,
		FechaRegistro: Date || String
	},
	{
		versionKey: false
	}
);

module.exports = Asegurado = mongoose.model(
	"Asegurado",
	aseguradoSchema,
	"Asegurados"
);
