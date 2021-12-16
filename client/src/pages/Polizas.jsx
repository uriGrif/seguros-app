import Button from "../components/Button";
import React, { useState, useContext } from "react";
import PolizaSearchResult from "../components/PolizaSearchResult";
import { PolizaFormFields } from "../resources/FormFields";
import { ModalContext } from "../contexts/ModalContext";
import {
	SearchPolizas,
	GetPolizasByNumero,
	GetPolizasByNombreAsegurado
} from "../utils/FetchPolizas";
import { FuzzySearchAsegurados } from "../utils/FetchAsegurados";

const Polizas = () => {
	const [polizas, setPolizas] = useState([]);
	const [showError, setShowError] = useState(false);
	const { openModal } = useContext(ModalContext);
	const [inputNro, setInputNro] = useState("");
	const [inputNombre, setInputNombre] = useState("");
	const [inputObs, setInputObs] = useState("");
	const [fuzzyOptions, setFuzzyOptions] = useState([]);

	const handleSearchByNumero = async () => {
		try {
			const response = await GetPolizasByNumero(inputNro);
			setPolizas(response);
			setShowError(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearchByNombreAsegurado = async () => {
		try {
			const response = await GetPolizasByNombreAsegurado(inputNombre);
			setPolizas(response);
			setShowError(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleFuzzySearchOptions = async () => {
		try {
			const response = await FuzzySearchAsegurados(inputNombre);
			setFuzzyOptions(response);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearchByObservaciones = async () => {
		try {
			const response = await SearchPolizas(inputObs);
			setPolizas(response);
			setShowError(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="searchForm cuadradoAzul">
				{/* <Button
					text="crear nueva +"
					onClick={() =>
						openModal("create", "polizas", PolizaFormFields, {})
					}
				/> */}
				<h2>Buscar Polizas</h2>
				<div>
					<input
						type="text"
						placeholder="Numero Poliza"
						value={inputNro}
						onChange={e => setInputNro(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter") handleSearchByNumero();
						}}
					/>
					<Button text="Buscar" onClick={handleSearchByNumero} />
				</div>
				<div>
					<input
						type="text"
						placeholder="Asegurado"
						list="nombres"
						onChange={e => {
							setInputNombre(e.target.value);
							handleFuzzySearchOptions(inputNombre);
						}}
						onKeyDown={e => {
							if (e.key === "Enter")
								handleSearchByNombreAsegurado();
						}}
					/>
					<datalist id="nombres">
						{fuzzyOptions.map(option => (
							<option
								key={option.Asegurado}
								value={option.Asegurado}
							/>
						))}
					</datalist>
					<Button
						text="Buscar"
						onClick={handleSearchByNombreAsegurado}
					/>
				</div>
				<div>
					<input
						type="text"
						placeholder="Observaciones"
						value={inputObs}
						onChange={e => setInputObs(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter")
								handleSearchByObservaciones();
						}}
					/>
					<Button
						text="Buscar"
						onClick={handleSearchByObservaciones}
					/>
				</div>
			</div>
			<div className="resultadosLista">
				<h2>Resultados</h2>
				{polizas &&
					polizas.map(p => (
						<PolizaSearchResult
							id={p._id}
							key={p._id}
							NroPoliza={p.NroPoliza}
							Asegurado={p.Asegurado}
							Observaciones={p.Observaciones}
						/>
					))}
				{polizas.length === 0 && showError && (
					<p>No se encontraron resultados</p>
				)}
			</div>
		</>
	);
};

export default Polizas;
