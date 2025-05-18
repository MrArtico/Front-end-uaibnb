import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { CharacteristicsItem } from '../models/characteristics';
import CharacteristicList from '../components/EntityList/characteristicsList';
import NavigationHeader from '../components/Header';
import CharacteristicForm from '../components/EntityAdd/characteristicForm';
import CharacteristicEdit from '../components/EntityEdit/characteristicEdit';
import AddButton from '../components/AddButton';


export default function CharacteristicsPage() {
	const [characteristics, setCharacteristics] = useState<CharacteristicsItem[]>([]);
	const [addCharacteristic, setAddCharacteristic] = useState(false);
	const [editCharacteristic, setEditCharacteristic] = useState({
		id: "0",
		edit: false,
	});

	const handleAddCharacteristic = () => {
		setAddCharacteristic(!addCharacteristic);
	};

	const handleEditCharacteristics = (id: string) => {
		setEditCharacteristic((prev) => {
			return { id, edit: !prev.edit };
		});
	};

	useEffect(() => {
		if (editCharacteristic.edit || addCharacteristic) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [editCharacteristic.edit, addCharacteristic]);

	return (
		<PageContainer>
			<NavigationHeader/>
			<ActionsContainer>
				<AddButton text="Adicionar Característica" onClick={()=>handleAddCharacteristic()} />
				</ActionsContainer>
			<CharacteristicsContainer>
				<CharacteristicList handleEditCharacteristic={handleEditCharacteristics} characteristics={characteristics} setCharacteristics={setCharacteristics} />
			</CharacteristicsContainer>
			{addCharacteristic && <CharacteristicForm onClick={() =>handleAddCharacteristic()} setCharacteristics={setCharacteristics} />}
			{editCharacteristic.edit && (
				<CharacteristicEdit id={editCharacteristic.id} handleEditCharacteristic={handleEditCharacteristics} setCharacteristics={setCharacteristics} />
			)}
		</PageContainer>
	);

}

const PageContainer = styled.div`
	position: relative;
	display: block;
	width: 100%;
	min-height: 100dvh;
	max-width: 100dvw;
	overflow-x: hidden;
	background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
`;

const CharacteristicsContainer = styled.div`
	width: 100%;
	box-sizing: border-box;

	display: flex;
	justify-content: center;
	align-items: center;
`;


const ActionsContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px auto;
`;
