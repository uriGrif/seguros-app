import { Link } from "react-router-dom";
import Companias from "../resources/selectOptions/Companias.json";

const PolizaTile = ({ id, poliza }) => {
	return (
		<Link to={`/polizas/${id}`}>
			<div className="cuadradoGris polizaTile">
				<h3>{poliza.NroPoliza}</h3>
				<h4>{poliza.Observaciones}</h4>
				<p>{poliza.compania}</p>
				<p>{poliza.seccion}</p>
				<p>{poliza.vigencia}</p>
				<div className="fechas">
					<p>{poliza.f_Inicio}</p>
					<p>{poliza.f_Vencimiento}</p>
				</div>
			</div>
		</Link>
	);
};

export default PolizaTile;
