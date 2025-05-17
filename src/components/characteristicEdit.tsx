import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
	getCharacteristicsById,
	updateCharacteristics,
} from "../services/characteristicsService";
import type { CharacteristicsItem } from "../models/characteristics";

export default function CharacteristicEdit() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<
		Pick<CharacteristicsItem["fields"], "nome" | "descricao">
	>({
		nome: "",
		descricao: "",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			return;
		}

		async function fetchData() {
			try {
				setLoading(true);
				const response = await getCharacteristicsById(id as string);
				if (response !== undefined) {
					setFormData(response);
					setError(null);
				}
			} catch {
				setError("Erro ao buscar característica.");
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchData();
		else {
			setError("ID inválido.");
			setLoading(false);
		}
	}, [id, navigate]);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setFormData(
			(prev) =>
				({
					...prev,
					[name]: value,
				} as Pick<CharacteristicsItem["fields"], "nome" | "descricao">)
		);
		setError(null);
		setSuccess(null);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (formData === undefined) return;

		if (!formData.nome || !formData.descricao) {
			setError("Preencha todos os campos.");
			setSuccess(null);
			return;
		}
		try {
			setLoading(true);
			await updateCharacteristics(id as string, formData);
			setSuccess("Característica atualizada com sucesso!");
			setError(null);
		} catch {
			setError("Erro ao atualizar característica.");
			setSuccess(null);
		} finally {
			setLoading(false);
		}
	}

	if (loading)
		return (
			<Container>
				<h2>Carregando...</h2>
			</Container>
		);
	if (error)
		return (
			<Container>
				<ErrorMsg>{error}</ErrorMsg>
			</Container>
		);

	return (
		<Container>
			<FormEdit onSubmit={handleSubmit}>
				<h2>Editar Característica</h2>
				<Label htmlFor="nome">Nome:</Label>
				<Input
					id="nome"
					type="text"
					name="nome"
					value={formData.nome}
					onChange={handleChange}
					disabled={loading}
				/>
				<Label htmlFor="descricao">Descrição:</Label>
				<TextArea
					id="descricao"
					name="descricao"
					value={formData.descricao}
					onChange={handleChange}
					disabled={loading}
				/>
				<Button type="submit" disabled={loading}>
					Salvar
				</Button>
				{success && <SuccessMsg>{success}</SuccessMsg>}
			</FormEdit>
		</Container>
	);
}

// Estilos
const Container = styled.div`
	max-width: 500px;
	margin: 2rem auto;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
	padding: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FormEdit = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	width: 100%;
`;

const Label = styled.label`
	font-weight: bold;
	color: #333;
`;

const Input = styled.input`
	padding: 0.75rem 1rem;
	border-radius: 8px;
	border: 1px solid #ccc;
	background-color: #f5f5f5;
	font-size: 1rem;
	color: black;
`;

const TextArea = styled.textarea`
	padding: 0.75rem 1rem;
	border-radius: 8px;
	border: 1px solid #ccc;
	background-color: #f5f5f5;
	font-size: 1rem;
	min-height: 80px;
	color: black;
`;

const Button = styled.button`
	padding: 0.75rem;
	background-color: #4caf50;
	color: white;
	font-weight: bold;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	margin-top: 10px;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: #388e3c;
	}
	&:disabled {
		background-color: #bdbdbd;
		cursor: not-allowed;
	}
`;

const ErrorMsg = styled.div`
	color: #d32f2f;
	font-weight: bold;
	margin: 1rem 0;
`;

const SuccessMsg = styled.div`
	color: #388e3c;
	font-weight: bold;
	margin: 1rem 0;
`;
