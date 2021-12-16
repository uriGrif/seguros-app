const BASE_URL = "http://localhost:8000";

export const GetById = async (path, id) => {
	const res = await fetch(`${BASE_URL}/${path}/${id}`);
	return await res.json();
};

export const GetSearch = async (path, params) => {
	let p = "?";
	Object.entries(params).forEach(([key, value]) => {
		p += `${key}=${value}&`;
	});
	const res = await fetch(`${BASE_URL}/${path}/search${p}`);
	return await res.json();
};

export const GetSearchFuzzy = async (path, params) => {
	let p = "?";
	Object.entries(params).forEach(([key, value]) => {
		p += `${key}=${value}&`;
	});
	const res = await fetch(`${BASE_URL}/${path}/search-fuzzy${p}`);
	return await res.json();
};

export const Post = async (path, data) => {
	const res = await fetch(`${BASE_URL}/${path}/add`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	return await res.json();
};

export const Edit = async (path, id, data) => {
	const res = await fetch(`${BASE_URL}/${path}/edit/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	return await res.json();
};

export const Delete = async (path, id) => {
	const res = await fetch(`${BASE_URL}/${path}/delete/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	});
	return await res.json();
};
