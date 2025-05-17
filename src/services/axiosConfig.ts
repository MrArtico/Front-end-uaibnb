import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.BASE_URL;
const token = process.env.TOKEN;

const axiosConfig = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${token}`
	}
});

export default axiosConfig;
