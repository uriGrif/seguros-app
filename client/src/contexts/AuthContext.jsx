import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	function isTokenExpired(token) {
		const expiry = JSON.parse(atob(token.split(".")[1])).exp;
		return Math.floor(new Date().getTime() / 1000) >= expiry;
	}

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token && !isTokenExpired(token)) {
			setIsLoggedIn(true);
		}
	}, []);

	const login = async clave => {
		let token = "";
		let message = "";
		let status;

		try {
			const res = await fetch(`${import.meta.env.VITE_DOMAIN}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					password: clave
				})
			});
			status = res.status;

			const r = await res.json();

			token = r.token;
			message = r.message;
		} catch (error) {
			console.error(message);
		}

		if (status !== 200) {
			console.log(message);
			setErrorMessage(message);
			return;
		}

		localStorage.setItem("authToken", token);

		setIsLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setIsLoggedIn(false);
	};

	const value = {
		isLoggedIn,
		login,
		logout,
		errorMessage
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
