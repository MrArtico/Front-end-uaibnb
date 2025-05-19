import { useEffect, useState } from "react";
import {
	getAllCharacteristics,
	getCharacteristicsById,
	updateCharacteristics,
} from "../../services/characteristicsService";
import type { CharacteristicsItem } from "../../models/characteristics";
import ErrorAlert from "../Alerts/ErrorAlert";
import CloseButton from "../CloseButton";
import {
	FormContainer,
	FormGroup,
	FormInput,
	FormLabel,
	FormPageContainer,
	FormSubmitButton,
	FormTextArea,
	FormWrapper,
} from "./form.styles";
import WarningAlert from "../Alerts/WarningAlert";

export default function CharacteristicEdit({
	id,
	handleEditCharacteristic,
	setCharacteristics,
}: {
	id: string;
	handleEditCharacteristic: (id: string) => void;
	setCharacteristics: (characteristics: CharacteristicsItem[]) => void;
}) {

	const [formData, setFormData] = useState<
		Pick<CharacteristicsItem["fields"], "nome" | "descricao">
	>({
		nome: "",
		descricao: "",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [alert, setAlert] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		async function fetchData() {
			try {
				setLoading(true);
				const response = await getCharacteristicsById(id);
				setFormData(response ?? { nome: "", descricao: "" });
			} catch (error) {
				setError("Erro ao buscar caracter stica.");
				setTimeout(() => setError(null), 3000);
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [id]);

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
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (formData === undefined) return;

		if (!formData.nome || !formData.descricao) {
			setAlert("Preencha todos os campos.");
			setTimeout(() => setError(null), 3000);
			return;
		}
		try {
			setLoading(true);
			await updateCharacteristics(id as string, formData);

			const updated = await getAllCharacteristics();
			setCharacteristics(updated);
			handleEditCharacteristic(id);
			setError(null);
		} catch {
			setError("Erro ao atualizar característica.");
			setTimeout(() => setError(null), 3000);
		} finally {
			setLoading(false);
		}
	}

	if (loading)
		return (
			<FormContainer>
				<h2>Carregando...</h2>
			</FormContainer>
		);

	return (
		<FormPageContainer>
			<FormContainer>
				<CloseButton onClick={() => handleEditCharacteristic(id)} />
				<h2>Editar Característica</h2>
				<FormWrapper onSubmit={handleSubmit}>
					<FormGroup>
						<FormLabel htmlFor="nome">Nome:</FormLabel>
						<FormInput
							id="nome"
							type="text"
							name="nome"
							value={formData.nome}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
					<FormLabel htmlFor="descricao">Descrição:</FormLabel>
					<FormTextArea
						id="descricao"
						name="descricao"
						value={formData.descricao}
						onChange={handleChange}
					/>
					</FormGroup>
					<FormSubmitButton type="submit" disabled={loading}>
						Salvar
					</FormSubmitButton>
				</FormWrapper>
					{error && <ErrorAlert errorMessage={error} />}
					{alert && <WarningAlert errorMessage={alert}/>}
			</FormContainer>
		</FormPageContainer>
	);
}
