import "./App.css";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Asegurados from "./pages/Asegurados";
import Polizas from "./pages/Polizas";
import Asegurado from "./pages/Asegurado";
import Poliza from "./pages/Poliza";
import Modal from "react-modal";
import Formulario from "./components/Formulario";
import Listados from "./pages/Listados";
import LoginForm from "./components/LoginForm";
import { ModalContext } from "./contexts/ModalContext";
import { AuthContext } from "./contexts/AuthContext";

function App() {
	const { isOpen, closeModal } = useContext(ModalContext);
	const { isLoggedIn } = useContext(AuthContext);

	Modal.setAppElement("#root");

	return (
		<>
			{!isLoggedIn && <LoginForm />}
			{isLoggedIn && (
				<Router>
					<SideBar />
					<Modal
						isOpen={isOpen}
						onRequestClose={closeModal}
						className="Modal cuadradoAzul"
						overlayClassName="overlay"
						contentLabel="Modal"
					>
						<Formulario />
					</Modal>
					<div className="globalContainer">
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/asegurados" exact>
								<Asegurados />
							</Route>
							<Route path="/asegurados/:id">
								<Asegurado />
							</Route>
							<Route path="/polizas" exact>
								<Polizas />
							</Route>
							<Route path="/polizas/:id">
								<Poliza />
							</Route>
							<Route path="/listados">
								<Listados />
							</Route>
						</Switch>
					</div>
				</Router>
			)}
		</>
	);
}

export default App;
