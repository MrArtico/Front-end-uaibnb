import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type CharacteristicsItem } from "../../models/characteristics";
import CharacteristicSelector from "../characteristicSelector";
import { getAllCharacteristics } from "../../services/characteristicsService";
import { type Rental, type RentalUpdate } from "../../models/rental";
import { getAllRentals, getRentalById, updateRental } from "../../services/rentalService";
import CloseButton from "../CloseButton";
import ErrorAlert from "../Alerts/ErrorAlert";
import WarningAlert from "../Alerts/WarningAlert";
import { FormContainer, FormGroup, FormInput, FormLabel, FormPageContainer, FormSubmitButton, FormTextArea, FormWrapper } from "./form.styles";

interface FormEditProps {
	id: string;
	handleEditRental: (id: string) => void;
	setRentals: (rentals: Rental[]) => void;
}

export default function FormEdit({
	id,
	handleEditRental,
	setRentals,
}: FormEditProps) {
	const navigate = useNavigate();

	const [caracteristicas, setCaracteristicas] = useState<CharacteristicsItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [alert, setAlert] = useState<string | null>(null);

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

	useEffect(() => {
		if (!id) return;
		async function fetchRentalDetails(id: string) {
			try {
				const response: RentalUpdate = (await getRentalById(
					id
				)) as RentalUpdate;
				setFormData(response as RentalUpdate);
			} catch (error) {
				console.error("Erro ao buscar caracteristicas:", error);
				setError("Erro ao buscar caracteristicas:");
				setTimeout(()=> setError(null),3000);
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
				setError("Erro ao buscar caracteristicas:");
				setTimeout(()=> setError(null),3000);
			}
		}
		fetchCaracteristicas();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev: RentalUpdate) => ({
			...prev,
			fields: {
				...prev.fields,
				[name]: value,
			},
		}));
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
			setTimeout(()=> setAlert(null),3000);
			return;
		}

		if (formData.fields.imagem === "") {
			setAlert("Selecione uma imagem");
			setTimeout(()=> setAlert(null),3000);
			return;
		}
		try {
			formData.fields.preco = Number(formData.fields.preco);
			await updateRental(formData as RentalUpdate);

			const updated = await getAllRentals();
			setRentals(updated);

			handleEditRental(id);
		} catch(error: any) {
			console.error(error);
			setError("Não foi possível salvar os dados. Verifique as informações e tente novamente.");
			setTimeout(()=> setError(null), 3000);
		}
		return;
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = e.target;
		setFormData((prevState: RentalUpdate) => {

			if(!prevState.fields.locacao_caracteristicas) {
				prevState.fields.locacao_caracteristicas = [];
			}

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

	return (
		<FormPageContainer>
			<FormContainer>
				<CloseButton onClick={() => handleEditRental(id)} />
				<h2>Editar Locação</h2>
				<FormWrapper onSubmit={handleSubmit}>
					<FormGroup>
						<FormLabel>Título</FormLabel>
						<FormInput
							type="text"
							name="titulo"
							value={formData.fields.titulo}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel>Descrição:</FormLabel>
						<FormTextArea
							name="descricao"
							value={formData.fields.descricao}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel>Preço:</FormLabel>
						<FormInput
							type="number"
							name="preco"
							value={formData.fields.preco}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel>Cidade:</FormLabel>
						<FormInput
							type="text"
							name="cidade"
							value={formData.fields.cidade}
							onChange={handleChange}
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel>Imagem URL:</FormLabel>
						<FormInput
							type="text"
							name="imagem"
							value={formData.fields.imagem}
							onChange={handleChange}
						/>

					</FormGroup>
						<FormLabel htmlFor="caracteristicas">Características da locação</FormLabel>
						<CharacteristicSelector
							caracteristicas={caracteristicas}
							checkedCaracteristicas={formData.fields.locacao_caracteristicas as string[]}
							handleCheckboxChange={handleCheckboxChange}
						/>

					<FormSubmitButton type="submit">Salvar</FormSubmitButton>
				</FormWrapper>

				{error && <ErrorAlert errorMessage={error}/>}
				{alert && <WarningAlert errorMessage={alert}/>}
			</FormContainer>
		</FormPageContainer>
	);
}
