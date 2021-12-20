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
import { ModalContext } from "./contexts/ModalContext";

function App() {
	const { isOpen, closeModal } = useContext(ModalContext);

	Modal.setAppElement("#root");

	return (
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
					{/* <Route path="/asegurados" exact>
					<Asegurados />
				</Route>
				<Route path="/asegurados/nuevo">
					<NuevoAsegurados />
				</Route>
				<Route path="/asegurados/:id">
					<Asegurado />
				</Route>
				<Route path="/polizas" exact>
					<Polizas />
				</Route>
				<Route path="/polizas/nuevo">
					<NuevaPoliza />
				</Route>
				<Route path="/polizas/:id">
					<Poliza />
				</Route>
				<Route path="/listados">
					<Listados />
				</Route>
				<Route path="/herramientas">
					<Herramientas />
				</Route>
				<Route path="/compañías">
					<Companias />
				</Route> 
				
				Iconos:

				<i class="fas fa-address-card"></i> "Asegurados"
				<i class="fas fa-chart-bar"></i> "listados"
				<i class="fas fa-landmark"></i> "Companias"
				<i class="fas fa-file-alt"></i> "Polizas"
				<i class="fas fa-trash-alt"></i> "Borrar"
				<i class="fas fa-plus-square"></i> "Nuevo"
				<i class="fas fa-bars"></i> "Menu Hmbrger"
				<i class="fas fa-edit"></i> "edit"
				<i class="fas fa-copy"></i> "copy"
				<i class="fas fa-redo-alt"></i> "renovar"
				
				*/}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
