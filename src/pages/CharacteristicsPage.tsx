import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { CharacteristicsItem } from '../models/characteristics';
import { getAllCharacteristics } from '../services/characteristicsService';
import { useNavigate } from 'react-router-dom';

import { GoGear } from "react-icons/go";

export default function CharacteristicsPage() {
	const navigate = useNavigate();
	const [characteristics, setCharacteristics] = useState<CharacteristicsItem[]>([]);

	useEffect(()=>{
		async function fetchCharacteristics() {
			try {
				const response = await getAllCharacteristics();
				setCharacteristics(response);
			} catch (error) {
				console.error('Erro ao buscar as caracteristicas:', error);
				navigate('/');
				return;
			}
		}
		fetchCharacteristics();
		}, [navigate]);

	return (
		<Container>
			{characteristics.map((characteristic: CharacteristicsItem) => {
				const { nome, descricao, usuario_criacao, usuario_atualizacao } = characteristic.fields;
				return(
				<Card key={characteristic.id}>
					<CardTitle>{nome}</CardTitle>
					<CardDescription>{descricao}</CardDescription>
					<UserInfo>
						<UserInfoSpan>Criado por: {usuario_criacao.name}</UserInfoSpan>
						<UserInfoSpan>Atualizado por: {usuario_atualizacao.name}</UserInfoSpan>
					</UserInfo>
					<ConfigContainer>
						<GoGear size={30}/>
					</ConfigContainer>
				</Card>
			)})}
		</Container>
	);

}


const ConfigContainer = styled.div`
	display: flex;
	position: absolute;
	right: 5px;
	bottom: 5px;
	padding: 0.3rem;
	color: black;
	background-color: rgba(0, 0, 0, 0.2); 
	cursor: pointer;
	border-radius: 30px;
	transition: all 0.2s;

	&:hover {
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
	}

`;

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

	flex-wrap: wrap;
	justify-content: center;
	width: 100%;

	gap: 5px;
`;

const Card = styled.div`
	position: relative;
	background-color: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	
	padding: 1.5rem;
	transition: transform 0.2s;
	width: 100%;
	max-width: 300px;
	margin: 0 auto;
	color: black;

	&:hover {
		transform: translateY(-2px);
		z-index: 100;
	}
`;

const CardTitle = styled.h2`
	font-size: 1.25rem;
	margin-bottom: 0.5rem;
	color: #00796b;
`;

const CardDescription = styled.p`
	font-size: 0.95rem;
	color: #444;
`;

const UserInfo = styled.div`
	margin-top: 1rem;
	font-size: 0.8rem;
	color: #888;
`;

const UserInfoSpan = styled.span`
	display: block;
`;

