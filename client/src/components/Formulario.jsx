import { useContext, useState, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { useForm } from "react-hook-form";
import * as Inputs from "../components/Inputs";
import "../styles/Modal.css";
import Button from "./Button";
import * as FetchFunctions from "../utils/FetchFunctions";
import { RenovarPoliza } from "../utils/FetchPolizas";
import MotivosBaja from "../resources/selectOptions/MotivosBaja.json";

const Formulario = () => {
	const { actionType, values, fields, path, closeModal } =
		useContext(ModalContext);
	const [title, setTitle] = useState("");
	const { register, handleSubmit, formState, getValues, setValue } = useForm({
		defaultValues: values
	});
	const [motivoRenovacion, setMotivoRenovacion] = useState("");

	useEffect(() => {
		if (actionType === "create") {
			setTitle(`Crear ${path.slice(0, -1)}`);
		} else if (actionType === "edit") {
			setTitle(`Editar ${path.slice(0, -1)}`);
		} else if (actionType === "renew") {
			setTitle(`Renovar ${path.slice(0, -1)}`);
		} else {
			setTitle(`Eliminar ${path.slice(0, -1)}`);
		}
	}, [actionType, path]);

	useEffect(() => {
		if (Object.keys(formState.errors).length !== 0) {
			alert(
				"Hay uno o mas campos que contienen valores invalidos. Por favor revise los datos."
			);
		}
	}, [formState]);

	const onSubmit = async data => {
		if (actionType === "create") {
			const newItem = await FetchFunctions.Post(path, data);
			closeModal();
			if (path === "coberturas") {
				window.location.reload();
			} else {
				window.location.href = `/${path}/${newItem._id}`;
			}
		} else if (actionType === "renew") {
			delete data._id;
			const newItem = await RenovarPoliza(
				values._id,
				motivoRenovacion,
				data
			);
			closeModal();
			window.location.href = `/polizas/${newItem._id}`;
		} else if (actionType === "edit") {
			await FetchFunctions.Edit(path, values._id, data);
			closeModal();
			window.location.reload();
		} else {
			await FetchFunctions.Delete(path, values);
			closeModal();
			history.back();
		}
	};

	return (
		<>
			<h2>{title}</h2>
			{actionType === "renew" && (
				<div className="inputField">
					<label>Seleccione el Motivo de la Renovacion </label>
					<select
						value={motivoRenovacion}
						onChange={e => setMotivoRenovacion(e.target.value)}
					>
						{MotivosBaja.map(i => {
							return (
								<option
									value={i._id["$oid"]}
									key={i._id["$oid"]}
								>
									{i.text}
								</option>
							);
						})}
					</select>
				</div>
			)}
			{actionType !== "delete" && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="formFields">
						{fields.map(f => {
							if (f.name !== "Observaciones") {
								if (f.type !== "select") {
									if (f.type !== "checkbox") {
										return (
											<Inputs.TextInput
												key={f.name}
												type={f.type}
												name={f.name}
												label={f.label}
												register={register}
												getValues={getValues}
												setValue={setValue}
											/>
										);
									} else {
										return (
											<Inputs.CheckSwitch
												key={f.name}
												name={f.name}
												label={f.label}
												register={register}
												value={values[f.name] || false}
												setValue={setValue}
											/>
										);
									}
								} else {
									if (
										f.name === "motivoBaja" &&
										actionType === "renew" &&
										values.Baja === false
									)
										return;
									return (
										<Inputs.Select
											key={f.name}
											name={f.name}
											label={f.label}
											register={register}
											getValues={getValues}
											setValue={setValue}
										/>
									);
								}
							} else {
								return (
									<Inputs.TextArea
										key={f.name}
										register={register}
									/>
								);
							}
						})}
					</div>
					<div className="buttons">
						<Button text="Cancelar" onClick={closeModal} />
						<Button text="Aceptar" type="submit" />
					</div>
				</form>
			)}
			{actionType === "delete" && (
				<div className="modalEliminar">
					<h3>
						Realmente desea eliminar est
						{path === "polizas" ? "a" : "e"} {path.slice(0, -1)}?
					</h3>
					<div className="buttons">
						<Button text="Cancelar" onClick={closeModal} />
						<Button text="Eliminar" onClick={onSubmit} />
					</div>
				</div>
			)}
		</>
	);
};

export default Formulario;
