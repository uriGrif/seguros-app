import { Link } from "react-router-dom";

const PolizaSearchResult = ({ id, NroPoliza, Asegurado, Observaciones }) => {
	return (
		<Link to={`polizas/${id}`}>
			<div className="cuadradoGris searchResultItem">
				<h4>{NroPoliza}</h4>
				<p>{Observaciones}</p>
				<p>{Asegurado}</p>
			</div>
		</Link>
	);
};

export default PolizaSearchResult;
