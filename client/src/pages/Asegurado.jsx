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
import S from "react-switch"; //https://github.com/vitejs/vite/issues/2139
import { json2csv } from "json-2-csv";

const Switch = S.default ? S.default : S;

const Asegurado = () => {
	const { openModal } = useContext(ModalContext);
	const [asegurado, setAsegurado] = useState({});
	const [polizas, setPolizas] = useState([]);
	const [soloVigentes, setSoloVigentes] = useState(false);
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

	const DATE_FIELDS = ["FechaNacimiento"];

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

	const handleEdit = () => {
		openModal("edit", "asegurados", AseguradoFormFields, asegurado);
	};

	const handleDelete = () => {
		openModal("delete", "asegurados", [], id);
	};

	const handleCreatePoliza = () => {
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
		});
	};

	const handleCopyPolizas = () => {
		const filteredPolizas = polizas.filter(p => {
			if (soloVigentes) {
				return !p.Baja;
			}
			return true;
		});
		json2csv(
			filteredPolizas,
			(err, csv) => {
				if (err) throw err;
				navigator.clipboard.writeText(csv);
			},
			{
				excludeKeys: [
					"_id",
					"idAsegurado",
					"idMotivoBaja",
					"Id",
					"idSeccion",
					"idCompania",
					"idProductor",
					"idVigencia",
					"idMPago"
				]
			}
		);
	};

	const reformatDate = date => {
		let nums = date.split("-");
		return `${nums[2]}/${nums[1]}/${nums[0]}`;
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
						let v = value;
						if (DATE_FIELDS.includes(key)) {
							v = reformatDate(value);
						}
						if (!NOT_DATOS.includes(key) && value) {
							return (
								<div className="dato" key={key}>
									<h4>{key}</h4>
									<p>{v}</p>
								</div>
							);
						}
					})}
				</div>
			</div>
			<div className="listaPolizas">
				<h3>Polizas</h3>
				<div className="polizas">
					<div className="soloVigentesControl">
						<span>Mostrar solo vigentes</span>
						<Switch
							checked={soloVigentes}
							onChange={e => setSoloVigentes(e)}
							onColor="#5e94b1"
						/>
					</div>
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{polizas
							.filter(p => {
								if (soloVigentes) {
									return !p.Baja;
								}
								return true;
							})
							.map(p => {
								return (
									<PolizaTile
										id={p._id}
										poliza={p}
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
						onClick={handleCreatePoliza}
					></i>
					<i
						className="fas fa-copy"
						title="copiar"
						onClick={handleCopyPolizas}
					></i>
				</div>
			</div>
		</>
	);
};

export default Asegurado;
