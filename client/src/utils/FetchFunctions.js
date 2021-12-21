const BASE_URL = import.meta.env.VITE_DOMAIN;

export const GetById = async (path, id) => {
	const res = await fetch(`${BASE_URL}/${path}/${id}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		}
	});
	return await res.json();
};

export const GetSearch = async (path, params) => {
	let p = "?";
	Object.entries(params).forEach(([key, value]) => {
		p += `${key}=${value}&`;
	});
	const res = await fetch(`${BASE_URL}/${path}/search${p}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		}
	});
	return await res.json();
};

export const GetSearchFuzzy = async (path, params) => {
	let p = "?";
	Object.entries(params).forEach(([key, value]) => {
		p += `${key}=${value}&`;
	});
	const res = await fetch(`${BASE_URL}/${path}/search-fuzzy${p}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		}
	});
	return await res.json();
};

export const Post = async (path, data) => {
	const res = await fetch(`${BASE_URL}/${path}/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		},
		body: JSON.stringify(data)
	});
	return await res.json();
};

export const Edit = async (path, id, data) => {
	const res = await fetch(`${BASE_URL}/${path}/edit/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		},
		body: JSON.stringify(data)
	});
	return await res.json();
};

export const Delete = async (path, id) => {
	const res = await fetch(`${BASE_URL}/${path}/delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${localStorage.getItem("authToken")}`
		}
	});
	return await res.json();
};
