import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./Button";
import "../styles/LoginForm.css";

const LoginForm = () => {
	const { login, errorMessage } = useContext(AuthContext);
	const [pswd, setPswd] = useState("");

	return (
		<div className="loginForm">
			<h1>Ingrese su contraseña para acceder</h1>
			<p>{errorMessage}</p>
			<input
				type="password"
				value={pswd}
				onChange={e => setPswd(e.target.value)}
				onKeyDown={e => {
					if (e.key === "Enter") login(pswd);
				}}
			></input>
			<Button text="ingresar" onClick={() => login(pswd)} />
		</div>
	);
};

export default LoginForm;
