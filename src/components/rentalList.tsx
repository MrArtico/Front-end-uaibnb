import { useEffect, useState, type JSX } from 'react';
import { getAllRentals } from '../services/rentalService';
import { RentalItem } from './rentaltem';
import type { Rental } from '../models/rental';
import styled from 'styled-components';

export default function RentalList() {
	const [rentals, setRentals] = useState<Rental[]>([]);
	const [rentalItems, setRentalItems] = useState<JSX.Element[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchRentals() {
			try {
				const response = await getAllRentals();
				setRentals(response);
			} catch (error) {
				console.error('Não foi possível buscar as locações:', error);
				setError('Não foi possível buscar as locações');
			}
		}
		fetchRentals();
	}, []);

	useEffect(() => {
		if (rentals.length === 0) return;

		try {
			const newRental = rentals.map((rental: Rental) => (<RentalItem key={rental.id} rental={rental} />));
			setRentalItems(newRental);
		} catch (error) {
			console.error('Erro ao formatar a lista de alugueis:', error);
			setError('Erro ao formatar a lista de alugueis');
		}
	}, [rentals]);

	if (error) return <p>{error}</p>
	if (rentals.length === 0) return <p>Loading...</p>;

	return (
		<RentalGrid>{rentalItems}</RentalGrid>
	);
}


const RentalGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 10px;
	flex-wrap: wrap;
	justify-content: center;
	width: clamp(300px, 80vw, 1200px);
	gap: 5px;
`;
