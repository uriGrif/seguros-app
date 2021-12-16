import Button from "../components/Button";
import AseguradoSearchResult from "../components/AseguradoSearchResult";
import React, { useState, useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { AseguradoFormFields } from "../resources/FormFields";
import { SearchAsegurados } from "../utils/FetchAsegurados";

const Asegurados = () => {
	const [asegurados, setAsegurados] = useState([]);
	const [showError, setShowError] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const { openModal } = useContext(ModalContext);

	const handleSearch = async () => {
		try {
			const response = await SearchAsegurados(inputValue);
			setAsegurados(response);
			setShowError(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="searchForm cuadradoAzul">
				<Button
					text="crear nuevo +"
					onClick={() =>
						openModal(
							"create",
							"asegurados",
							AseguradoFormFields,
							{}
						)
					}
				/>
				<h2>Buscar Asegurados</h2>
				<div>
					<input
						type="text"
						placeholder="Nombre"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter") handleSearch();
						}}
					/>
					<Button text="Buscar" onClick={handleSearch} />
				</div>
			</div>
			<div className="resultadosLista">
				<h2>Resultados</h2>
				{asegurados &&
					asegurados.map(a => (
						<AseguradoSearchResult
							key={a._id}
							id={a._id}
							Asegurado={a.Asegurado}
							Observaciones={a.Observaciones}
							Email={a.Email1}
						/>
					))}
				{asegurados.length === 0 && showError && (
					<p>No se encontraron resultados</p>
				)}
			</div>
		</>
	);
};

export default Asegurados;
