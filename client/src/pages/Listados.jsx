import Meses from "../resources/selectOptions/Meses.json";
import { useState } from "react";
import "../styles/Listados.css";
import Button from "../components/Button";
import {
	GetListadoVencimiento,
	GetListadoOperaciones
} from "../utils/FetchPolizas";
import { json2csv } from "json-2-csv";

const Listados = () => {
	const [year1, setYear1] = useState(new Date().getFullYear());
	const [year2, setYear2] = useState(new Date().getFullYear());
	const [month1, setMonth1] = useState(new Date().getMonth() + 1);
	const [month2, setMonth2] = useState(new Date().getMonth() + 1);
	const [showMensaje, setShowMensaje] = useState(false);

	const getVencimientos = async () => {
		try {
			await GetListadoVencimiento(month2, year2).then(listado => {
				json2csv(listado, (err, csv) => {
					if (err) throw err;
					navigator.clipboard.writeText(csv);
					setShowMensaje(true);
					setTimeout(() => {
						setShowMensaje(false);
					}, 3000);
				});
			});
		} catch (error) {
			console.error(error);
		}
	};

	const getOperaciones = async () => {
		try {
			await GetListadoOperaciones(month1, year1)
				.then(res => res.blob())
				.then(blob => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.style.display = "none";
					a.href = url;
					a.download = "operaciones.xlsx";
					document.body.appendChild(a);
					a.click();
					window.URL.revokeObjectURL(url);
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="listados">
			<div className="cuadradoAzul">
				<h2>Registro de Operaciones</h2>
				<label>Mes:</label>
				<select
					value={month1}
					onChange={e => setMonth1(e.target.value)}
				>
					{Meses.map(i => {
						return (
							<option value={i.Id} key={i.Id}>
								{i.Mes}
							</option>
						);
					})}
				</select>
				<label>Año:</label>
				<input
					type="text"
					value={year1}
					onChange={e => setYear1(e.target.value)}
				/>
				<Button text="Generar Listado" onClick={getOperaciones} />
			</div>
			<div className="cuadradoAzul">
				<h2>Polizas por Vencimiento</h2>
				<label>Mes:</label>
				<select
					value={month2}
					onChange={e => setMonth2(e.target.value)}
				>
					{Meses.map(i => {
						return (
							<option value={i.Id} key={i.Id}>
								{i.Mes}
							</option>
						);
					})}
				</select>
				<label>Año:</label>
				<input
					type="text"
					value={year2}
					onChange={e => setYear2(e.target.value)}
				/>
				<Button text="Generar Listado" onClick={getVencimientos} />
				{showMensaje && " Listado generado y copiado al portapapeles"}
			</div>
		</div>
	);
};

export default Listados;
