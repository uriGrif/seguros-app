import { Link } from "react-router-dom";

const PolizaTile = ({
	id,
	NroPoliza,
	Observaciones,
	f_Inicio,
	f_Vencimiento
}) => {
	return (
		<Link to={`/polizas/${id}`}>
			<div className="cuadradoGris polizaTile">
				<h3>{NroPoliza}</h3>
				<h4>{Observaciones}</h4>
				<div className="fechas">
					<p>{f_Inicio}</p>
					<p>{f_Vencimiento}</p>
				</div>
			</div>
		</Link>
	);
};

export default PolizaTile;
