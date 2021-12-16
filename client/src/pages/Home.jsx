import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
	const navItems = {
		ASEGURADOS: "fa-address-card",
		POLIZAS: "fa-file-alt",
		LISTADOS: "fa-chart-bar",
		COMPAÑIAS: "fa-landmark"
	};

	return (
		<div className="home">
			<h1>Bienvenido</h1>
			<div className="cuadrados">
				{Object.entries(navItems).map(([k, v]) => {
					return (
						<Link to={k.toLowerCase()} key={k}>
							<div className="cuadradoAzul">
								<i className={`fas ${v}`}></i>
								<h4 className="cuadradoTitle">{k}</h4>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
