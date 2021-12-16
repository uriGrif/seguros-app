const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const aseguradosRouter = require("./routes/Asegurados");
const polizasRouter = require("./routes/Polizas");
const coberturasRouter = require("./routes/Coberturas");
const globalesRouter = require("./routes/Globales");

// #region express settings
const app = express();
const PORT = process.env.PORT || 8000;
// #endregion

// #region mongoDB connection
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// #endregion

app.use(express.json());
app.use(cors());
app.use("/asegurados", aseguradosRouter);
app.use("/polizas", polizasRouter);
app.use("/coberturas", coberturasRouter);
app.use("/globales", globalesRouter);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
