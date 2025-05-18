import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_TOKEN;

const api = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${token}`
	}
});

export default api;
