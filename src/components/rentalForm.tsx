import React, { useEffect, useState } from "react";
import { getAllCharacteristics } from "../services/characteristicsService";
import type { CharacteristicsItem } from "../models/characteristics";
import CharacteristicSelector from "./characteristicSelector";
import type { RentalInputFields } from "../models/types/RentalnputFields";
import { createRental } from "../services/rentalService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { RiCloseLargeFill } from "react-icons/ri";

export default function RentalForm({ onClick }: { onClick: () => void }) {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<RentalInputFields>({
		titulo: "",
		descricao: "",
		preco: 0,
		cidade: "",
		locacao_caracteristicas: [],
		imagem: "",
	});

	const [caracteristicas, setCaracteristicas] = useState<CharacteristicsItem[]>(
		[]
	);

	useEffect(() => {
		async function fetchCaracteristicas() {
			try {
				const response = await getAllCharacteristics();
				setCaracteristicas(response);
			} catch (error) {
				console.error("Erro ao buscar caracteristicas:", error);
			}
		}
		fetchCaracteristicas();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		if (checked) {
			setFormData((prevState: RentalInputFields) => ({
				...prevState,
				locacao_caracteristicas: [
					...(prevState.locacao_caracteristicas as string[]),
					value,
				],
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				locacao_caracteristicas: (
					prevState.locacao_caracteristicas as string[]
				).filter((caracteristica) => caracteristica !== value),
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			formData.titulo === "" ||
			formData.descricao === "" ||
			formData.preco === 0 ||
			formData.cidade === ""
		) {
			alert("Preencha todos os campos");
			return;
		}

		if (formData.imagem === "") {
			alert("Selecione uma imagem");
			return;
		}

		formData.preco = Number(formData.preco);

		await createRental(formData as RentalInputFields);
		navigate("/");
		return;
	};

	return (
		<PageContainer>
			<FormContainer>
				<CloseIcon>
					<RiCloseLargeFill onClick={onClick} size={30} />
				</CloseIcon>
				<h2>Adicionar Locação</h2>

				<FormStyle onSubmit={handleSubmit}>
					<Label htmlFor="titulo">Título</Label>
					<input
						id="titulo"
						type="text"
						name="titulo"
						value={formData.titulo}
						onChange={handleChange}
						placeholder="Título"
					/>
					<Label htmlFor="descricao">Descrição</Label>
					<textarea
						id="descricao"
						name="descricao"
						value={formData.descricao}
						onChange={handleChange}
						placeholder="Descrição"
					/>
					<Label htmlFor="preco">Preço</Label>
					<input
						id="preco"
						type="number"
						name="preco"
						value={formData.preco}
						onChange={handleChange}
						placeholder="Preço em R$"
						min={0}
						step="0.01"
					/>
					<Label htmlFor="cidade">Cidade</Label>
					<input
						id="cidade"
						type="text"
						name="cidade"
						value={formData.cidade}
						onChange={handleChange}
						placeholder="Cidade"
					/>
					<Label htmlFor="imagem">Imagem</Label>
					<input
						id="imagem"
						type="text"
						name="imagem"
						value={formData.imagem}
						onChange={handleChange}
						placeholder="URL da imagem"
					/>

					{caracteristicas.length > 0 && (
						<>
							<Label htmlFor="caracteristicas">
								Características da locação
							</Label>
							<CharacteristicSelector
								caracteristicas={caracteristicas}
								handleCheckboxChange={handleCheckboxChange}
							/>
						</>
					)}
					<button type="submit">Enviar</button>
				</FormStyle>
			</FormContainer>
		</PageContainer>
	);
}

const CloseIcon = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	transition: all 0.2s ease-in-out;

	&:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
`;

const FormContainer = styled.div`
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	width: clamp(300px, 80vw, 500px);
	height: clamp(300px, 90vh, 1000px);
	background: linear-gradient(135deg, #4caf50, #2e7d32);
	padding: 1rem 1rem;
	border-radius: 16px;
`;

const PageContainer = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	z-index: 1000;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(2px);
`;

const FormStyle = styled.form`
	display: flex;
	flex-direction: column;
	height: 80%;
	width: calc(500px - 100px);
	overflow: auto;
	gap: 0.2rem;
	background: #ffffff;
	border-radius: 16px;
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
	padding: 2.5rem;

	input,
	textarea {
		padding: 0.75rem 1rem;
		border-radius: 8px;
		border: 1px solid #ccc;
		background-color: #242424;
		font-size: 1rem;
		max-width: 90%;
	}

	textarea {
		resize: none;
		min-height: 100px;
	}

	button {
		padding: 0.75rem;
		background-color: #4caf50;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-top: 10px;
	}

	button:hover {
		background-color: #388e3c;
	}
`;

const Label = styled.label`
	font-weight: bold;
	color: #333;
`;
