import { selectOptions } from "../resources/FormFields";
import Vigencias from "../resources/selectOptions/Vigencias.json";
import Switch from "react-switch";
import { useState } from "react";

export const TextInput = ({
	register,
	name,
	label,
	type,
	getValues,
	setValue
}) => {
	const valueAsNumber = type === "number";

	const onDateChange = value => {
		let vigencia = getValues("idVigencia");
		let monthsToAdd = Vigencias.find(v => v._id["$oid"] === vigencia).Meses;
		let newDate;
		if (monthsToAdd !== 0) {
			newDate = new Date(
				new Date(value).setMonth(
					new Date(value).getMonth() + monthsToAdd
				)
			);
		} else {
			newDate = new Date(
				new Date(value).setDate(new Date(value).getDate() + 1)
			);
		}
		setValue("f_Vencimiento", newDate.toISOString().split("T")[0]);
	};

	return (
		<div className="inputField" key={name}>
			<label>{label}</label>
			<input
				type={type}
				name={name}
				{...register(name, {
					valueAsNumber: valueAsNumber,
					min: 0,
					onChange: e =>
						name === "f_Inicio"
							? onDateChange(e.target.value)
							: null
				})}
			/>
		</div>
	);
};

export const CheckSwitch = ({ register, name, label, value, setValue }) => {
	const [checked, setChecked] = useState(value);

	const handleChange = c => {
		setChecked(c);
		setValue(name, c);
	};

	return (
		<div className="inputField" key={name}>
			<label>{label}</label>
			<input type="checkbox" name={name} {...register(name)} hidden />
			<Switch
				checked={checked}
				onChange={handleChange}
				onColor="#5e94b1"
			/>
		</div>
	);
};

export const Select = ({ register, name, label, getValues, setValue }) => {
	const onVigenciaChange = value => {
		let f_Inicio = getValues("f_Inicio");
		let monthsToAdd = Vigencias.find(v => v._id["$oid"] === value).Meses;
		let newDate;
		if (monthsToAdd !== 0) {
			newDate = new Date(
				new Date(f_Inicio).setMonth(
					new Date(f_Inicio).getMonth() + monthsToAdd
				)
			);
		} else {
			newDate = new Date(
				f_Inicio.getFullYear(),
				f_Inicio.getMonth(),
				f_Inicio.getDate() + 2
			);
		}
		setValue("f_Vencimiento", newDate.toISOString().split("T")[0]);
	};

	return (
		<div className="inputField" key={name}>
			<label>{label}</label>
			<select
				name={name}
				{...register(selectOptions[name].fieldName, {
					onChange: e => {
						name === "vigencia"
							? onVigenciaChange(e.target.value)
							: null;
					}
				})}
			>
				{selectOptions[name].options.map(i => {
					return (
						<option value={i._id["$oid"]} key={i._id["$oid"]}>
							{i.text}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export const TextArea = ({ register }) => {
	return (
		<div className="inputField">
			<label>Observaciones</label>
			<textarea
				className="observacionesArea textArea"
				key="obs"
				{...register("Observaciones")}
			/>
		</div>
	);
};

export const Prueba = ({ register, name }) => {
	return <input placeholder="hola" {...register(name)}></input>;
};
