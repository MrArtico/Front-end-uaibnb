import type { Rental } from "../types/rental";
import api from "./axiosConfig";

export async function getAllRentals() {
	try {
		const response = await api.get("/locacoes?view=Grid%20view");
		return response.data.records;
	} catch (error) {
        console.error(error);
	}
}

export async function getRentalById(id: number) {
	const response = await api.get(`/locacoes/${id}`);
	return response.data;
}

export async function createRental(rental: Partial<Rental>) {
	const response = await api.post("/locacoes", rental);
	return response.data;
}

export async function updateRental(rental: Partial<Rental>) {
	const response = await api.patch(`/locacoes`, rental);
	return response.data;
}
