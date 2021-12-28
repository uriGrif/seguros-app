const Auth = require("./Auth.js");

exports.handler = async function (event, context) {
	if (event.httpMethod === "POST") {
		const body = JSON.parse(event.body);
		const token = await Auth.loginUser(body.password);
		if (token) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					token,
					message: "Login correcto"
				})
			};
		} else {
			return {
				statusCode: 401,
				body: JSON.stringify({
					message: "Contraseña incorrecta"
				})
			};
		}
	}
	return;
};
