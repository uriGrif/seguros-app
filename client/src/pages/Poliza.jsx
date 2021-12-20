import CoberturaTile from "../components/CoberturaTile";
import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { PolizaFormFields, CoberturaFormFields } from "../resources/FormFields";
import { Link, useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import { GetPoliza } from "../utils/FetchPolizas";
import Companias from "../resources/selectOptions/Companias.json";
import { GetCoberturasByPoliza } from "../utils/FetchCoberturas";
import Vigencias from "../resources/selectOptions/Vigencias.json";
import { json2csv } from "json-2-csv";

const Poliza = () => {
	const { openModal } = useContext(ModalContext);
	const [poliza, setPoliza] = useState({});
	const [coberturas, setCoberturas] = useState([]);
	const { id } = useParams();

	const NOT_DATOS = [
		"NombreAsegurado",
		"_id",
		"Id",
		"Observaciones",
		"idCompania",
		"idAsegurado",
		"idMPago",
		"idProductor",
		"idVigencia",
		"idMotivoBaja",
		"idSeccion",
		"NroPoliza"
	];

	const breakpointColumnsObj = {
		default: 5,
		1100: 3,
		700: 3,
		500: 1
	};

	useEffect(async () => {
		try {
			const p = await GetPoliza(id);
			await setPoliza(p);
			const c = await GetCoberturasByPoliza(id);
			setCoberturas(c);
		} catch (err) {
			console.error(err);
		}
	}, []);

	const handleRenovar = () => {
		// Este bloque setea las fechas necesarias para la renovacion

		let vigencia = Vigencias.find(v => {
			if (v._id["$oid"] === poliza.idVigencia) return v;
		});

		let fechaBase = new Date(poliza.f_Vencimiento);
		let monthsToAdd = vigencia.Meses;
		const fechas = {
			f_Inicio: poliza.f_Vencimiento,
			FechaSolicitud: new Date(
				fechaBase.getFullYear(),
				fechaBase.getMonth(),
				fechaBase.getDate() - 7
			)
				.toISOString()
				.split("T")[0],
			f_Vencimiento:
				monthsToAdd !== 0
					? new Date(
							new Date(fechaBase).setMonth(
								new Date(fechaBase).getMonth() + monthsToAdd
							)
					  )
							.toISOString()
							.split("T")[0]
					: new Date(
							new Date(fechaBase).setDate(
								new Date(fechaBase).getDate() + 1
							)
					  )
							.toISOString()
							.split("T")[0]
		};

		let defaultValues = {
			...poliza,
			...fechas
		};

		openModal("renew", "polizas", PolizaFormFields, defaultValues);
	};

	const handleEdit = () => {
		openModal("edit", "polizas", PolizaFormFields, poliza);
	};

	const handleDelete = () => {
		openModal("delete", "polizas", [], id);
	};

	const handleCreateCobertura = () => {
		openModal("create", "coberturas", CoberturaFormFields, {
			idPoliza: id
		});
	};

	const handleCopyCoberturas = () => {
		json2csv(
			coberturas,
			(err, csv) => {
				if (err) throw err;
				navigator.clipboard.writeText(csv);
			},
			{
				excludeKeys: ["_id", "idPoliza", "idRiesgo", "Id", "Fecha"]
			}
		);
	};

	return (
		<>
			<div className="informacion">
				<div className="controls">
					<i
						className="fas fa-edit"
						title="editar"
						onClick={handleEdit}
					></i>
					<i
						className="fas fa-trash-alt"
						title="borrar"
						onClick={handleDelete}
					></i>
					<i
						className="fas fa-redo-alt"
						title="renovar"
						onClick={handleRenovar}
					></i>
				</div>
				<div className="main cuadradoAzul">
					<p>Nro</p>
					<h1>{poliza.NroPoliza}</h1>
					<Link to={`/asegurados/${poliza.idAsegurado}`}>
						<p>{poliza.NombreAsegurado}</p>
					</Link>
					<p>
						{Companias.map(c => {
							if (c._id["$oid"] === poliza.idCompania) {
								return c.text;
							}
						})}
					</p>
				</div>
				<div className="observaciones cuadradoGris">
					<h4>Observaciones</h4>
					<p>{poliza.Observaciones}</p>
				</div>
				<div className="datos cuadradoGris">
					{Object.entries(poliza).map(([key, value]) => {
						if (!NOT_DATOS.includes(key) && value) {
							return (
								<div className="dato" key={key}>
									<h4>{key}</h4>
									<p>{value.toString()}</p>
								</div>
							);
						}
					})}
				</div>
			</div>
			<div className="listaPolizas">
				<h3>Coberturas</h3>
				<div className="polizas">
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{coberturas.map(c => {
							return (
								<CoberturaTile key={c.idRiesgo} cobertura={c} />
							);
						})}
					</Masonry>
				</div>
				<div className="controls">
					<i
						className="fas fa-plus-square"
						title="agregar nuevo"
						onClick={handleCreateCobertura}
					></i>
					<i
						className="fas fa-copy"
						title="copiar"
						onClick={handleCopyCoberturas}
					></i>
				</div>
			</div>
		</>
	);
};

export default Poliza;
