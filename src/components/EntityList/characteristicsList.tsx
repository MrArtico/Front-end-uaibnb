import { useEffect, useState, type JSX } from "react";
import type { CharacteristicsItem } from "../../models/characteristics";
import { getAllCharacteristics } from "../../services/characteristicsService";
import { CharacteristicItem } from "../EntityAdd/characteristicItem";
import styled from "styled-components";
import ErrorAlert from "../Alerts/ErrorAlert";

export default function CharacteristicList({
	handleEditCharacteristic, characteristics, setCharacteristics
}: { handleEditCharacteristic: (id: string) => void, characteristics: CharacteristicsItem[], setCharacteristics: (characteristics: CharacteristicsItem[]) => void }) {
	const [characteristicsItem, setCharacteristicsItem] = useState<JSX.Element[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCharacteristics() {
			try {
				const response = await getAllCharacteristics();
				setCharacteristics(response);
			} catch (error) {
				console.error('Erro ao buscar as caracteristicas:', error);
				setError('Erro ao buscar as caracteristicas');
				return;
			}
		}
		fetchCharacteristics();
	}, [setCharacteristics]);

	useEffect(() => {
		if (characteristics.length === 0) return;

		try {
			const newCharacteristic = characteristics.map((characteristic: CharacteristicsItem) => (<CharacteristicItem key={characteristic.id} characteristic={characteristic} handleEditCharacteristic={handleEditCharacteristic} />));
			setCharacteristicsItem(newCharacteristic);
		} catch (error) {
			console.error('Erro ao formatar a lista de caracteristicas:', error);
			setError('Erro ao formatar a lista de caracteristicas');
		}
	}, [characteristics, handleEditCharacteristic]);

	return (<>
		<CharacteristicsContainer>
			{characteristicsItem}
		</CharacteristicsContainer>
		{error && <ErrorAlert errorMessage={error} />}
	</>)
}


const CharacteristicsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(calc(var(--card-width) + 2%), 1fr));

	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	padding: 10px;

	gap: 5px;
`;
