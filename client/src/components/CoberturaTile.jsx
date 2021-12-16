import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { CoberturaFormFields } from "../resources/FormFields";

const CoberturaTile = ({ cobertura }) => {
	const { openModal } = useContext(ModalContext);

	return (
		<div className="cuadradoGris coberturaTile">
			<h3>{cobertura.riesgo}</h3>
			<p>Endoso: {cobertura.Endoso}</p>
			<p>Valor Asegurado: {cobertura.ValorAsegurado}</p>
			<p>Prima: {cobertura.Prima}</p>
			<p>Premio: {cobertura.Premio}</p>
			<p>{cobertura.fecha}</p>
			<div className="controls">
				<i
					className="fas fa-edit"
					title="editar"
					onClick={() =>
						openModal(
							"edit",
							"coberturas",
							CoberturaFormFields,
							cobertura
						)
					}
				></i>
				<i
					className="fas fa-trash-alt"
					title="borrar"
					onClick={() =>
						openModal("delete", "coberturas", [], cobertura._id)
					}
				></i>
			</div>
		</div>
	);
};

export default CoberturaTile;
