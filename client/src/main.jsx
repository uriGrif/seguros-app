import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./contexts/ModalContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<ModalProvider>
				<App />
			</ModalProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
