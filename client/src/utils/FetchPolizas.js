import * as FetchFunctions from "./FetchFunctions";

const BASE_URL = import.meta.env.VITE_DOMAIN;
const PATH = "polizas";

export const GetPoliza = async id => {
	return await FetchFunctions.GetById(PATH, id);
};

export const GetPolizasByAsegurado = async id => {
	const res = await fetch(`${BASE_URL}/${PATH}/by-asegurado/${id}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		}
	});
	return await res.json();
};

export const GetPolizasByNombreAsegurado = async nombre => {
	const res = await fetch(
		`${BASE_URL}/${PATH}/by-nombre-asegurado/${nombre}`,
		{
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				authorization: `Bearer ${localStorage.getItem("authToken")}`
			}
		}
	);
	return await res.json();
};

export const GetPolizasByNumero = async num => {
	const res = await fetch(`${BASE_URL}/${PATH}/by-numero/${num}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		}
	});
	return await res.json();
};

export const SearchPolizas = async obs => {
	return await FetchFunctions.GetSearch(PATH, {
		obs: obs
	});
};

export const CreatePoliza = async poliza => {
	return await FetchFunctions.Post(PATH, poliza);
};

export const EditPoliza = async (id, data) => {
	return await FetchFunctions.Edit(PATH, id, data);
};

export const DeletePoliza = async id => {
	return await FetchFunctions.Delete(PATH, id);
};

export const RenovarPoliza = async (id, motivo, nueva) => {
	try {
		await EditPoliza(id, { Baja: true, idMotivoBaja: motivo });
		return await CreatePoliza(nueva);
	} catch (error) {
		console.error(error);
	}
};

export const GetListadoVencimiento = async (month, year) => {
	try {
		const res = await fetch(
			`${BASE_URL}/${PATH}/listado-vencimiento?month=${month}&year=${year}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					authorization: `Bearer ${localStorage.getItem("authToken")}`
				}
			}
		);
		return res.json();
	} catch (error) {
		console.error(error);
	}
};

export const GetListadoOperaciones = async (month, year) => {
	try {
		const res = await fetch(
			`${BASE_URL}/${PATH}/listado-operaciones?month=${month}&year=${year}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					authorization: `Bearer ${localStorage.getItem("authToken")}`
				}
			}
		);
		return res;
	} catch (error) {
		console.error(error);
	}
};
