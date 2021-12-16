const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companiaSchema = new Schema(
	{
		Id: Number,
		Compania: String
	},
	{
		versionKey: false
	}
);

module.exports = Compania = mongoose.model(
	"Compania",
	companiaSchema,
	"Companias"
);
