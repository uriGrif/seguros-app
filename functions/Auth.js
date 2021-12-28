const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const headerToToken = header => {
	const reg = /Bearer (.+)/;
	const match = header.match(reg);

	if (match !== null && match.length > 1) return match[1];
	return null;
};

// Verifica Token del request (con un header de Authorization: Bearer \<Token\>) y guarda la información decodificada en el Response.locals.authenticated.
module.exports.checkAuth = checkAuth = async authHeader => {
	let authorize = false;

	const token = headerToToken(authHeader);

	const claims = await verifyToken(token);

	if (claims !== null) {
		authorize = true;
	}

	return authorize;
};

// Verifica el JWT y devuelve user con claims de ser válido. En caso contrario, devuelve null.
const verifyToken = async token => {
	let validation;

	return jwt.verify(String(token), JWT_SECRET, (err, decoded) => {
		validation = decoded;
		if (err) return null;
		return validation;
	});
};

// Devuelve el JWT apropiado para el login.
const getToken = async user => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			user,
			JWT_SECRET,
			{
				expiresIn: "4h"
			},
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
};

// Verifica usuario y contraseña y devuelve un Token correspondiente (llama a `getToken`). De ser inválida la información de login, devuelve `null`
module.exports.loginUser = loginUser = async contraseña => {
	const login = contraseña === process.env.PASSWORD;
	if (!login) {
		return null;
	}
	return await getToken({ usuario: "admin" });
};
