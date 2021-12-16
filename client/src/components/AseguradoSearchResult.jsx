import { Link } from "react-router-dom";

const AseguradoSearchResult = ({ id, Asegurado, Observaciones, Email }) => {
	return (
		<Link to={`asegurados/${id}`}>
			<div className="cuadradoGris searchResultItem">
				<h4>{Asegurado}</h4>
				<p>{Observaciones}</p>
				<p>{Email}</p>
			</div>
		</Link>
	);
};

export default AseguradoSearchResult;
