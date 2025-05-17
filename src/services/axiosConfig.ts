import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const baseURL = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_TOKEN;

const api = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${token}`
	}
});

export default api;
