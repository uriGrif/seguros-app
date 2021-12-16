import * as FetchFunctions from "./FetchFunctions";

const BASE_URL = "http://localhost:8000";
const PATH = "polizas";

export const GetPoliza = async id => {
	return await FetchFunctions.GetById(PATH, id);
};

export const GetPolizasByAsegurado = async id => {
	const res = await fetch(`${BASE_URL}/${PATH}/by-asegurado/${id}`);
	return await res.json();
};

export const GetPolizasByNombreAsegurado = async nombre => {
	const res = await fetch(
		`${BASE_URL}/${PATH}/by-nombre-asegurado/${nombre}`
	);
	return await res.json();
};

export const GetPolizasByNumero = async num => {
	const res = await fetch(`${BASE_URL}/${PATH}/by-numero/${num}`);
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
		//dar de baja
		await EditPoliza(id, { Baja: true, idMotivoBaja: motivo });
		await CreatePoliza(nueva);
	} catch (error) {
		console.error(error);
	}
};
