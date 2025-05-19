import type { CharacteristicsItem } from "../../models/characteristics";
import { useState } from "react";
import { createCharacteristics, getAllCharacteristics } from "../../services/characteristicsService";
import CloseButton from "../CloseButton";
import { FormContainer, FormGroup, FormInput, FormLabel, FormPageContainer, FormSubmitButton, FormWrapper } from "../EntityEdit/form.styles";

export default function CharacteristicForm({
	onClick,
	setCharacteristics,
}: {
	onClick: () => void;
	setCharacteristics: React.Dispatch<
		React.SetStateAction<CharacteristicsItem[]>
	>;
}) {

	const [formData, setFormData] = useState<
		Pick<CharacteristicsItem["fields"], "nome" | "descricao">
	>({
		nome: "",
		descricao: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formData.nome || !formData.descricao) {
			alert("Preencha todos os campos");
			return;
		}

		await createCharacteristics(formData);

    const updated = await getAllCharacteristics();
    setCharacteristics(updated);

    onClick();

		return;
	};

	return (
		<FormPageContainer>
			<FormContainer>
				<CloseButton onClick={() => onClick()} />
				<h2>Adicionar Caracteristica</h2>
				<FormWrapper onSubmit={handleSubmit}>
					<FormGroup>
						<FormLabel>Nome:</FormLabel>
						<FormInput
							type="text"
							name="nome"
							value={formData.nome}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<FormLabel>Descrição:</FormLabel>
						<FormInput
							type="text"
							name="descricao"
							value={formData.descricao}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormSubmitButton type="submit">Salvar</FormSubmitButton>
				</FormWrapper>
			</FormContainer>
		</FormPageContainer>
	);
}

