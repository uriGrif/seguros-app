import * as FetchFunctions from "./FetchFunctions";

const PATH = "asegurados";

export const GetAsegurado = async id => {
	return await FetchFunctions.GetById(PATH, id);
};

export const SearchAsegurados = async nombre => {
	return await FetchFunctions.GetSearch(PATH, { q: nombre });
};

export const FuzzySearchAsegurados = async nombre => {
	return await FetchFunctions.GetSearchFuzzy(PATH, { q: nombre });
};

export const CreateAsegurado = async asegurado => {
	return await FetchFunctions.Post(PATH, asegurado);
};

export const EditAsegurado = async (id, data) => {
	return await FetchFunctions.Edit(PATH, id, data);
};

export const DeleteAsegurado = async id => {
	return await FetchFunctions.Delete(PATH, id);
};
