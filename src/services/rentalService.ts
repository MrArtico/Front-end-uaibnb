import type { RentalUpdate } from "../models/rental";
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

export async function createRental(rental: RentalUpdate) {
	const data = { "records": [{fields: rental.fields}] };
	
	const response = await api.post("/locacoes", data);
	return response.data.records;
}

export async function updateRental(rental: RentalUpdate) {
	const data = {
		"records": [
			{
				id: rental.id,
				fields: {
					titulo: rental.fields.titulo,
					descricao: rental.fields.descricao,
					preco: rental.fields.preco,
					cidade: rental.fields.cidade,
					locacao_caracteristicas: rental.fields.locacao_caracteristicas,
					imagem: rental.fields.imagem,
				}
			}
		]
	}

	const response = await api.patch(`/locacoes`, data);
	return response.data;
}
