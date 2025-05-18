import styled from "styled-components";
import type { CharacteristicsItem } from "../../models/characteristics";

import { GoGear } from "react-icons/go";

export function CharacteristicItem({
	characteristic,
	handleEditCharacteristic
}: {
	characteristic: CharacteristicsItem;
	handleEditCharacteristic: (id: string) => void;
}) {
	const { nome, descricao, usuario_criacao, usuario_atualizacao } =
		characteristic.fields;
	return (
		<>
			<Card key={characteristic.id}>
				<CardTitle>{nome}</CardTitle>
				<CardDescription>{descricao}</CardDescription>
				<UserInfo>
					<UserInfoSpan>Criado por: {usuario_criacao.name}</UserInfoSpan>
					<UserInfoSpan>
						Atualizado por: {usuario_atualizacao.name}
					</UserInfoSpan>
				</UserInfo>
				<ConfigContainer onClick={(e) => {
					e.stopPropagation();
					handleEditCharacteristic(characteristic.id)
				}}>
					<GoGear size={30} />
				</ConfigContainer>
			</Card>
		</>
	);
}

const Card = styled.div`
	position: relative;
	background-color: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	padding: 1rem;
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
