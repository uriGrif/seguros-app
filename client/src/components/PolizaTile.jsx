import { Link } from "react-router-dom";
import Companias from "../resources/selectOptions/Companias.json";

const PolizaTile = ({ id, poliza }) => {
	return (
		<Link to={`/polizas/${id}`}>
			<div className="cuadradoGris polizaTile">
				<h3>Nro: {poliza.NroPoliza}</h3>
				<p>Compania: {poliza.compania}</p>
				<p>Seccion: {poliza.seccion}</p>
				<p>Vigencia: {poliza.vigencia}</p>
				<p>Observaciones: {poliza.Observaciones}</p>
				<div className="fechas">
					<p>{poliza.f_Inicio}</p>
					<p>{poliza.f_Vencimiento}</p>
				</div>
			</div>
		</Link>
	);
};

export default PolizaTile;
