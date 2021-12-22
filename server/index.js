const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const aseguradosRouter = require("./routes/Asegurados");
const polizasRouter = require("./routes/Polizas");
const coberturasRouter = require("./routes/Coberturas");
const Auth = require("./middlewares/Auth");

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

app.post("/login", async (req, res) => {
	const token = await Auth.loginUser(req.body.password);
	if (token) {
		res.status(200);
		res.json({
			token,
			message: "Login correcto"
		});
	} else {
		res.status(401);
		res.json({
			message: "Contraseña incorrecta"
		});
	}
	res.send();
});

app.use(Auth.checkAuth);
app.use("/asegurados", aseguradosRouter);
app.use("/polizas", polizasRouter);
app.use("/coberturas", coberturasRouter);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
