import { styled } from "styled-components";
import { useEffect, useState } from "react";
import RentalForm from "../components/EntityAdd/rentalForm";
import RentalList from "../components/EntityList/rentalList";
import type { Rental } from "../models/rental";

import NavigationHeader from "../components/Header";
import AddButton from "../components/AddButton";
import FormEdit from "../components/EntityEdit/FormEdit";

function RentalPage() {
	const [rentals, setRentals] = useState<Rental[]>([]);
	const [addRental, setAddRental] = useState(false);
	const [editRental, setEditRental] = useState({
		id: "0",
		edit: false,
	});
	const handleAddRental = () => {
		setAddRental(!addRental);
	};

	const handleEditRental = (id: string) => {
		setEditRental((prev) => {
			return { id, edit: !prev.edit };
		});
	};

	useEffect(() => {
		if (editRental.edit || addRental) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [editRental.edit, addRental]);

	return (
		<PageContainer>
			<NavigationHeader />
			<ActionsContainer>
			<AddButton text="Adicionar Locação" onClick={()=>handleAddRental()} />
			</ActionsContainer>
			<RentalContainer>
				<RentalList handleEditRental={handleEditRental} rentals={rentals} setRentals={setRentals} />
			</RentalContainer>
			{addRental && <RentalForm onClick={handleAddRental} setRentals={setRentals} />}
			{editRental.edit && (
				<FormEdit id={editRental.id} handleEditRental={handleEditRental} setRentals={setRentals} />
			)}
		</PageContainer>
	);
}

export default RentalPage;



const PageContainer = styled.div`
	display: block;
	width: 100%;
	min-height: 100dvh;
	max-width: 100%;
	overflow-x: hidden;
	background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
`;



const RentalContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	margin-bottom: 10px;
`;

const ActionsContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px auto;
`;
