import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Rental } from "../models/rental";
import { getRentalById } from "../services/rentalService";
import textToColor from "../utils/textToColor";

export default function RentalDetails() {
	const { id } = useParams<{ id: string }>();
	const [rental, setRental] = useState<Rental | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			navigate("/");
			return;
		}


		const fetchRental = async () => {
			try {
				setLoading(true);
				const data = await getRentalById(id);
				setRental(data);
				setError(null);
			} catch (err) {
				console.error(err);
				setError("Erro ao carregar dados da locação.");
			} finally {
				setLoading(false);
			}
		};

		fetchRental();

	}, [id, navigate]);



	return (

		<RentalPage>
			{!loading && !error && rental && (
				<RentalContent>

					<InfoCard>
						<ButtonBack onClick={() => navigate("/")}>Voltar</ButtonBack>

						<DetailsArea>
							<h1>{rental.fields.titulo}</h1>

							<Section>
								<Title>Descrição</Title>
								<p>{rental.fields.descricao}</p>
							</Section>

							<Section>
								<Title>Preço</Title>
								<p>R$ {rental.fields.preco.toFixed(2)}</p>
							</Section>

							<Section>
								<Title>Cidade</Title>
								<p>{rental.fields.cidade}</p>
							</Section>

							{rental.fields.nome_caracteristica?.length > 0 && (
								<Section>
									<Title>Características</Title>
									<CaracteristicasList>
										{rental.fields.nome_caracteristica.map((caracteristica, index) => (
											<CaracteristicElement color={textToColor(caracteristica)} key={index}>{caracteristica}</CaracteristicElement>
										))}
									</CaracteristicasList>
								</Section>
							)}
						</DetailsArea>

							{rental.fields.imagem && (
								<ImageSection>
									<Image src={rental.fields.imagem} alt={rental.fields.titulo} />
								</ImageSection>
							)}
					</InfoCard>


				</RentalContent>
			)}
		</RentalPage>
	);
}


// Estilos...

const Title = styled.h2`
	font-size: 1rem;
	font-weight: bold;
	margin: 0;
`;

const RentalPage = styled.section`
	font-size: 60px;
	max-width: 100%;

	overflow: hidden;
	min-height: 100dvh;
	overflow-x: hidden;
	background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
	color: #ffffff;
	box-sizing: border-box;
	font-family: 'Segoe UI', Roboto, sans-serif;
`;

const ButtonBack = styled.button`
	position: absolute;
	border: solid 1px var(--primary-color);
	color: var(--primary-color);
	background-color: white;
	padding: 0.6rem 1.2rem;
	border-radius: 8px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 600;
	transition: all 0.3s ease-in-out;
	display: flex;
	height: min-content;

	&:hover {
		background-color: #ffffff;
		color: #1b5e20;
		transform: scale(1.05);
	}
`;

const RentalContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100dvh;
	padding: 2rem;
`;

const InfoCard = styled.div`
	background-color: white;
	padding: 2rem;
	border-radius: 1.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	max-width: 80%;
	width: 90%;
	gap: 2rem;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

	h1 {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		color: var(--primary-color);
	}

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 1.5rem;
	}
`;


const Section = styled.section`
	display: flex;
	flex-direction: column;

	h2 {
		font-size: 1.2rem;
		color: var(--secondary-color);
	}

	p {
		font-size: 1rem;
		color: #424242;
		margin: 6px;
	}
`;

const CaracteristicasList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	list-style: none;
	padding: 0;
	margin: 0;

`;

const CaracteristicElement = styled.li`
	background: ${({ color }) => color};
	color: #ffffff;
	padding: 0.4rem 1rem;
	border-radius: 20px;
	font-size: 0.9rem;
	white-space: nowrap;
	transition: background 0.3s;
	cursor: pointer;

`

const ImageSection = styled.div`
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	display: flex;
	min-width: 100%;
	max-width: 100%;
	flex: 1;
	aspect-ratio: 16 / 9;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: inherit;
	transition: transform 0.4s ease, filter 0.3s ease;

	transition: transform 0.3s ease, object-position 3s ease;


	${ImageSection}:hover & {
		transform: scale(1.03);
		filter: brightness(0.9);
		cursor: pointer;

			transform: scale(1.10);
			object-position: 100% 65%;
	}
`;

const DetailsArea = styled.div`
	margin: 25px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 500px;
`;

