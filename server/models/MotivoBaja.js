const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const motivoBajaSchema = new Schema(
	{
		Id: Number,
		MotivoBaja: String
	},
	{
		versionKey: false
	}
);

module.exports = MotivoBaja = mongoose.model(
	"MotivoBaja",
	motivoBajaSchema,
	"MotivosBaja"
);
