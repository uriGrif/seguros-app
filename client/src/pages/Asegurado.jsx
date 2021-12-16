import PolizaTile from "../components/PolizaTile";
import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { AseguradoFormFields, PolizaFormFields } from "../resources/FormFields";
import TiposPersona from "../resources/selectOptions/TiposPersona.json";
import "../styles/Details.css";
import { GetAsegurado } from "../utils/FetchAsegurados";
import { GetPolizasByAsegurado } from "../utils/FetchPolizas";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";

const Asegurado = () => {
	const { openModal } = useContext(ModalContext);
	const [asegurado, setAsegurado] = useState({});
	const [polizas, setPolizas] = useState([]);
	const { id } = useParams();

	const today = new Date();

	const NOT_DATOS = [
		"Asegurado",
		"_id",
		"Id",
		"Observaciones",
		"Email1",
		"Email2",
		"TelefonoLaboral",
		"TelefonoParticular",
		"Celular",
		"tipoPersona",
		"TipoPersona"
	];

	const breakpointColumnsObj = {
		default: 6,
		1100: 4,
		700: 3,
		500: 1
	};

	useEffect(async () => {
		await GetAsegurado(id).then(data => {
			setAsegurado(data);
		});
		await GetPolizasByAsegurado(id).then(data => {
			setPolizas(data);
		});
	}, []);

	return (
		<>
			<div className="informacion">
				<div className="controls">
					<i
						className="fas fa-edit"
						title="editar"
						onClick={() =>
							openModal(
								"edit",
								"asegurados",
								AseguradoFormFields,
								asegurado
							)
						}
					></i>
					<i
						className="fas fa-trash-alt"
						title="borrar"
						onClick={() =>
							openModal("delete", "asegurados", [], id)
						}
					></i>
				</div>
				<div className="main cuadradoAzul">
					<h1>{asegurado.Asegurado}</h1>
					{asegurado.Email1 && <p>{asegurado.Email1}</p>}
					{asegurado.Email2 && <p>{asegurado.Email2}</p>}
					{asegurado.TelefonoLaboral && (
						<p>{asegurado.TelefonoLaboral}</p>
					)}
					{asegurado.TelefonoParticular && (
						<p>{asegurado.TelefonoParticular}</p>
					)}
					{asegurado.Celular && <p>{asegurado.Celular}</p>}
					<p>
						{TiposPersona.map(t => {
							if (t._id["$oid"] === asegurado.TipoPersona) {
								return t.text;
							}
						})}
					</p>
				</div>
				<div className="observaciones cuadradoGris">
					<h4>Observaciones</h4>
					<p>{asegurado.Observaciones}</p>
				</div>
				<div className="datos cuadradoGris">
					{Object.entries(asegurado).map(([key, value]) => {
						if (!NOT_DATOS.includes(key) && value) {
							return (
								<div className="dato" key={key}>
									<h4>{key}</h4>
									<p>{value}</p>
								</div>
							);
						}
					})}
				</div>
			</div>
			<div className="listaPolizas">
				<h3>Polizas</h3>
				<div className="polizas">
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{polizas.map(p => {
							return (
								<PolizaTile
									id={p._id}
									NroPoliza={p.NroPoliza}
									Observaciones={p.Observaciones}
									f_Inicio={p.f_Inicio}
									f_Vencimiento={p.f_Vencimiento}
									key={p._id}
								/>
							);
						})}
					</Masonry>
				</div>
				<div className="controls">
					<i
						className="fas fa-plus-square"
						title="agregar nuevo"
						onClick={() =>
							openModal("create", "polizas", PolizaFormFields, {
								idAsegurado: id,
								NombreAsegurado: asegurado.Asegurado,
								f_Inicio: today.toISOString().split("T")[0],
								FechaSolicitud: new Date(
									today.getFullYear(),
									today.getMonth(),
									today.getDate() - 7
								)
									.toISOString()
									.split("T")[0],
								f_Vencimiento: new Date(
									today.getFullYear() + 1,
									today.getMonth(),
									today.getDate()
								)
									.toISOString()
									.split("T")[0]
							})
						}
					></i>
				</div>
			</div>
		</>
	);
};

export default Asegurado;
