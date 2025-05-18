import type { CharacteristicsItem } from "../models/characteristics";
import api from "./axiosConfig";

export async function getCharacteristicsByFormula(ids: string[]) {
	const formula = ids.map(id => `RECORD_ID()="${id}"`).join(" OR ");
	const response = await api.get(`/caracteristicas?view=Grid%20view&filterByFormula=OR(${formula})`);
	return response.data;
}

export async function getCharacteristicsById(id: string): Promise<Pick<CharacteristicsItem["fields"], "nome" | "descricao"> | undefined> {
	const response = await api.get<CharacteristicsItem>(`/caracteristicas/${id}`);
	const { fields } = response.data;
	return fields;
}

export async function getAllCharacteristics() {
	const response = await api.get(`/caracteristicas?view=Grid%20view`);
	return response.data.records;
}

export async function createCharacteristics(characteristic: Pick<CharacteristicsItem["fields"], "nome" | "descricao">) {
	const data = { "records": [{ "fields": characteristic }] };
	const response = await api.post("/caracteristicas", data);
	return response.data;
}

export async function updateCharacteristics(id: string, characteristic: Pick<CharacteristicsItem["fields"], "nome" | "descricao">) {
	const data = { "records": [{ "id": id, "fields": {
		"nome": characteristic.nome,
		"descricao": characteristic.descricao
	} }] };
	const response = await api.patch("/caracteristicas", data);
	return response.data;
}
