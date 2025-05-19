import { useEffect, useState, type JSX } from 'react';
import { getAllRentals } from '../../services/rentalService';
import { RentalItem } from '../EntityAdd/rentaltem';
import type { Rental } from '../../models/rental';
import styled from 'styled-components';

export default function RentalList({ handleEditRental, rentals, setRentals }: { handleEditRental: (id: string) => void, rentals: Rental[], setRentals: (rentals: Rental[]) => void }) {

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
				setTimeout(()=>setError(null),3000);
			}
		}
		fetchRentals();
	}, [setRentals]);

	useEffect(() => {
		if (rentals.length === 0) return;

		try {
			const newRental = rentals.map((rental: Rental) => (<RentalItem key={rental.id} rental={rental} handleEditRental={handleEditRental} />));

			setRentalItems(newRental);
		} catch (error) {
			console.error('Erro ao formatar a lista de alugueis:', error);
			setError('Erro ao formatar a lista de alugueis');
			setTimeout(()=>setError(null),3000);
		}
	}, [rentals, handleEditRental]);

	if (error) return <p>{error}</p>
	if (rentals.length === 0) return;

	return (
		<RentalGrid>{rentalItems}</RentalGrid>
	);
}

const RentalGrid = styled.div`
	display: grid;
	margin-top: 10px;
	grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
	gap:5px;
	flex-wrap: wrap;
	padding: 0px 30px;
	width: clamp(100px, 100%, 100%);
`;
