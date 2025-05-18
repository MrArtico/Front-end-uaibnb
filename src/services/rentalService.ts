import type { Rental } from "../models/rental";
import api from "./axiosConfig";

export async function getAllRentals() {
	try {
		const response = await api.get("/locacoes?view=Grid%20view");
		return response.data.records;
	} catch (error) {
		console.error(error);
	}
}

export async function getRentalById(id: string) {
	const response = await api.get(`/locacoes/${id}`);
	delete response.data.fields.id; 
	delete response.data.fields.usuario_atualizacao;
	delete response.data.fields.usuario_criacao;
	return response.data;
}

export async function createRental(rental: Partial<Rental['fields']>) {
	console.log({ "records": [{ "fields": rental }] });

	const response = await api.post("/locacoes", { "records": [{ "fields": rental }] });
	return response.data.records;
}

export async function updateRental(id: string, rental: Partial<Rental['fields']>) {

	const data = {
		"records": [
			{
				"id": id,
				"fields": rental
			}
		]
	}

	console.log(data); 

	const response = await api.patch(`/locacoes`, data);
	return response.data;
}
