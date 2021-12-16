import * as FetchFunctions from "./FetchFunctions";

const BASE_URL = "http://localhost:8000";
const PATH = "coberturas";

export const GetCobertura = async id => {
	return await FetchFunctions.GetById(PATH, id);
};

export const GetCoberturasByPoliza = async id => {
	const res = await fetch(`${BASE_URL}/${PATH}/by-poliza/${id}`);
	return await res.json();
};

export const CreateCobertura = async Cobertura => {
	return await FetchFunctions.Post(PATH, Cobertura);
};

export const EditCobertura = async (id, data) => {
	return await FetchFunctions.Edit(PATH, id, data);
};

export const DeleteCobertura = async id => {
	return await FetchFunctions.Delete(PATH, id);
};