const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const polizaSchema = new Schema(
	{
		Id: Number,
		FechaSolicitud: String || Date,
		f_Inicio: String || Date,
		f_Vencimiento: String || Date,
		NroPoliza: String,
		idAsegurado: mongoose.Types.ObjectId,
		Observaciones: String,
		Prima: Number,
		Premio: Number,
		Comision: Number,
		idSeccion: mongoose.Types.ObjectId,
		idCompania: mongoose.Types.ObjectId,
		idProductor: mongoose.Types.ObjectId,
		idVigencia: mongoose.Types.ObjectId,
		idMPago: mongoose.Types.ObjectId,
		Art: Boolean,
		Patrimoniales: Boolean,
		Capitas: Number,
		Siniestros: Number,
		PatenteVehiculo: String,
		ValorAsegurado: Number,
		RAutomatica: Boolean,
		Baja: Boolean,
		idMotivoBaja: mongoose.Types.ObjectId,
		FechaRegistro: Date,
		NombreAsegurado: String
	},
	{
		versionKey: false
	}
);

module.exports = Poliza = mongoose.model("Poliza", polizaSchema, "Polizas");
