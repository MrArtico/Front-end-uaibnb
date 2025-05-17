import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRentalById, updateRental } from "../services/rentalService";
import type { RentalInputFields } from "../models/types/RentalnputFields";

export default function FormEdit() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [caracteristicas, setCaracteristicas] = useState<CharacteristicsItem[]>([]);
	const [formData, setFormData] = useState<RentalInputFields>({
		titulo: "",
		descricao: "",
		preco: 0,
		cidade: "",
		locacao_caracteristicas: [],
		imagem: "",
	});

	useEffect(() => {
		if (!id) return;
		async function fetchRentalDetails(id: string) {
			try {
				const response = await getRentalById(id);
				setFormData(response.fields as RentalInputFields);
			} catch (error) {
				console.error("Erro ao buscar caracteristicas:", error);
				navigate("/");
				return;
			}
		}
		fetchRentalDetails(id);
	}, [id, navigate]);

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

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

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
		const response = await updateRental(id as string, formData);

		console.log(response);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		if (checked) {
			setFormData(
				(
					prevState: RentalInputFields
				) => ({
					...prevState,
					locacao_caracteristicas: [
						...(prevState.locacao_caracteristicas as string[]),
						value,
					],
				})
			);
		} else {
			setFormData((prevState) => ({
				...prevState,
				locacao_caracteristicas: (
					prevState.locacao_caracteristicas as string[]
				).filter((caracteristica) => caracteristica !== value),
			}));
		}
	};

	return (
		<PageContainer>
			<FormContainer>
				<FormStyle onSubmit={handleSubmit}>
					<FormGroup>
						<Label>Título</Label>
						<Input
							type="text"
							name="titulo"
							value={formData.titulo}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Descrição:</Label>
						<TextArea
							name="descricao"
							value={formData.descricao}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Preço:</Label>
						<Input
							type="number"
							name="preco"
							value={formData.preco}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Cidade:</Label>
						<Input
							type="text"
							name="cidade"
							value={formData.cidade}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<Label>Imagem URL:</Label>
						<Input
							type="text"
							name="imagem"
							value={formData.imagem}
							onChange={handleChange}
						/>
						<Label htmlFor="caracteristicas">Características da locação</Label>
						<CharacteristicSelector
							caracteristicas={caracteristicas}
							handleCheckboxChange={handleCheckboxChange}
						/>

					</FormGroup>

					<SubmitButton type="submit">Salvar</SubmitButton>
				</FormStyle>
			</FormContainer>
		</PageContainer>
	);
}


import styled from "styled-components";
import type { CharacteristicsItem } from "../models/characteristics";
import CharacteristicSelector from "./characteristicSelector";
import { getAllCharacteristics } from "../services/characteristicsService";

export const PageContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(2px);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: clamp(300px, 80vw, 500px);
	height: clamp(400px, 90vh, 700px);
	background: linear-gradient(135deg, #4caf50, #2e7d32);
	border-radius: 16px;
	padding: 1rem;
	box-shadow: 0 4px 12px rgba(0,0,0,0.2);
	overflow: hidden;
`;

export const FormStyle = styled.form`
	background: #fff;
	border-radius: 16px;
	padding: 2rem;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-y: auto;
`;

export const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Label = styled.label`
	font-weight: bold;
	color: #333;
	margin-bottom: 0.5rem;
`;

export const Input = styled.input`
	padding: 0.75rem 1rem;
	border-radius: 8px;
	border: 1px solid #ccc;
	background-color: #242424;
	color: white;
	font-size: 1rem;
`;

export const TextArea = styled.textarea`
	padding: 0.75rem 1rem;
	border-radius: 8px;
	border: 1px solid #ccc;
	background-color: #242424;
	color: white;
	font-size: 1rem;
	resize: none;
	min-height: 100px;
`;

export const SubmitButton = styled.button`
	padding: 0.75rem;
	background-color: #4caf50;
	color: white;
	font-weight: bold;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-top: 10px;

	&:hover {
		background-color: #388e3c;
	}
`;
