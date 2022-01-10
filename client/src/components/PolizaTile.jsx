import { Link } from "react-router-dom";
import Companias from "../resources/selectOptions/Companias.json";

const PolizaTile = ({ id, poliza }) => {
	const reformatDate = date => {
		let nums = date.split("-");
		return `${nums[2]}/${nums[1]}/${nums[0]}`;
	};

	return (
		<Link to={`/polizas/${id}`}>
			<div className="cuadradoGris polizaTile">
				<h3>Nro: {poliza.NroPoliza}</h3>
				<p>Compania: {poliza.compania}</p>
				<p>Seccion: {poliza.seccion}</p>
				<p>Vigencia: {poliza.vigencia}</p>
				<p>Observaciones: {poliza.Observaciones}</p>
				<div className="fechas">
					<p>{reformatDate(poliza.f_Inicio)}</p>
					<p>{reformatDate(poliza.f_Vencimiento)}</p>
				</div>
			</div>
		</Link>
	);
};

export default PolizaTile;
