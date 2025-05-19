import React, { useEffect, useState } from "react";
import { getAllCharacteristics } from "../../services/characteristicsService";
import type { CharacteristicsItem } from "../../models/characteristics";
import CharacteristicSelector from "../characteristicSelector";
import { createRental, getAllRentals } from "../../services/rentalService";
import type { Rental, RentalUpdate } from "../../models/rental";
import ErrorAlert from "../Alerts/ErrorAlert";
import WarningAlert from "../Alerts/WarningAlert";
import CloseButton from "../CloseButton";
import { FormPageContainer, FormContainer, FormWrapper, FormLabel, FormInput, FormTextArea, FormSubmitButton } from "../EntityEdit/form.styles";

export default function RentalForm({
	onClick,
	setRentals,
}: {
	onClick: () => void;
	setRentals: (rentals: Rental[]) => void;
}) {
	const [formData, setFormData] = useState<RentalUpdate>({
		id: "",
		fields: {
			titulo: "",
			descricao: "",
			preco: 0,
			cidade: "",
			locacao_caracteristicas: [],
			imagem: "",
		},
	});
	const [error, setError] = useState<string | null>(null);
	const [alert, setAlert] = useState<string | null>(null);

	const [caracteristicas, setCaracteristicas] = useState<CharacteristicsItem[]>(
		[]
	);

	useEffect(() => {
		async function fetchCaracteristicas() {
			try {
				const response = await getAllCharacteristics();
				setCaracteristicas(response);
				setError(null);
			} catch (error) {
				console.error("Erro ao buscar caracteristicas:", error);
				setError("Erro ao buscar caracteristicas");
				setTimeout(() => setError(null), 3000);
			}
		}
		fetchCaracteristicas();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			fields: {
				...prev.fields,
				[name]: value,
			},
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		setFormData((prevState: RentalUpdate) => {
			const updatedCaracteristicas = checked
				? [...(prevState.fields.locacao_caracteristicas as string[]), value]
				: (prevState.fields.locacao_caracteristicas as string[]).filter(
					(caracteristica) => caracteristica !== value
				);

			return {
				...prevState,
				fields: {
					...prevState.fields,
					locacao_caracteristicas: updatedCaracteristicas,
				},
			};
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			formData.fields.titulo === "" ||
			formData.fields.descricao === "" ||
			formData.fields.preco === 0 ||
			formData.fields.cidade === ""
		) {
			setAlert("Preencha todos os campos");
			setTimeout(() => setAlert(null), 3000);
			return;
		}

		if (formData.fields.imagem === "") {
			setAlert("Selecione uma imagem");
			setTimeout(() => setAlert(null), 3000);
			return;
		}
		formData.fields.preco = Number(formData.fields.preco);

		try {
			await createRental(
			formData as RentalUpdate
		);
		const updated = await getAllRentals();
		setRentals(updated);

		onClick();
		}catch(error:any) {
			console.error(error.message);
			setError("Não foi possível salvar os dados. Verifique as informações e tente novamente.");
			setTimeout(() => setAlert(null), 3000);
		}
		return;
	};

	return (
		<FormPageContainer>
			<FormContainer>
				<CloseButton onClick={()=>onClick()} />
				<h2>Adicionar Locação</h2>

				<FormWrapper onSubmit={handleSubmit}>
					<FormLabel htmlFor="titulo">Título</FormLabel>
					<FormInput
						id="titulo"
						type="text"
						name="titulo"
						value={formData.fields.titulo}
						onChange={handleChange}
						placeholder="Título"
					/>
					<FormLabel htmlFor="descricao">Descrição</FormLabel>
					<FormTextArea
						id="descricao"
						name="descricao"
						value={formData.fields.descricao}
						onChange={handleChange}
						placeholder="Descrição"
					/>
					<FormLabel htmlFor="preco">Preço</FormLabel>
					<FormInput
						id="preco"
						type="number"
						name="preco"
						value={formData.fields.preco}
						onChange={handleChange}
						placeholder="Preço em R$"
						min={0}
						step="0.01"
					/>
					<FormLabel htmlFor="cidade">Cidade</FormLabel>
					<FormInput
						id="cidade"
						type="text"
						name="cidade"
						value={formData.fields.cidade}
						onChange={handleChange}
						placeholder="Cidade"
					/>
					<FormLabel htmlFor="imagem">Imagem</FormLabel>
					<FormInput
						id="imagem"
						type="text"
						name="imagem"
						value={formData.fields.imagem}
						onChange={handleChange}
						placeholder="URL da imagem"
					/>

					{caracteristicas.length > 0 && (
						<>
							<FormLabel htmlFor="caracteristicas">
								Características da locação
							</FormLabel>
							<CharacteristicSelector
								caracteristicas={caracteristicas}
								handleCheckboxChange={handleCheckboxChange}
								checkedCaracteristicas={formData.fields.locacao_caracteristicas as string[]}
							/>
						</>
					)}
					<FormSubmitButton type="submit">Enviar</FormSubmitButton>
				</FormWrapper>
				{error && <ErrorAlert errorMessage={error} />}
				{alert && <WarningAlert errorMessage={alert} />}
			</FormContainer>
		</FormPageContainer>
	);
}