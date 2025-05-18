import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Rental } from "../models/rental";
import { getRentalById } from "../services/rentalService";

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

		let isMounted = true;

		const fetchRental = async () => {
			try {
				setLoading(true);
				const data = await getRentalById(id);
				if (isMounted) {
					setRental(data);
					setError(null);
				}
			} catch (err) {
				console.error(err);
				if (isMounted) setError("Erro ao carregar dados da locação.");
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchRental();

		return () => {
			isMounted = false;
		};
	}, [id, navigate]);

	return (

		<RentalContainer>

			<ButtonBack onClick={() => navigate("/")}>Voltar</ButtonBack>

			{loading && <LoadingMessage>Carregando...</LoadingMessage>}
			{error && <ErrorMessage>{error}</ErrorMessage>}

			{!loading && !error && rental && (
				<RentalContent>
					<InfoCard>
						<h1>{rental.fields.titulo}</h1>

						<Section>
							<h2>Descrição</h2>
							<p>{rental.fields.descricao}</p>
						</Section>

						<Section>
							<h2>Preço</h2>
							<p>R$ {rental.fields.preco}</p>
						</Section>

						<Section>
							<h2>Cidade</h2>
							<p>{rental.fields.cidade}</p>
						</Section>

						{rental.fields.nome_caracteristica?.length > 0 && (
							<Section>
								<h2>Características</h2>
								<CaracteristicasList>
									{rental.fields.nome_caracteristica.map((caracteristica, index) => (
										<li key={`${caracteristica}-${index}`}>{caracteristica}</li>
									))}
								</CaracteristicasList>
							</Section>
						)}
					</InfoCard>

					{rental.fields.imagem && (
						<ImageSection>
							<Image src={rental.fields.imagem} alt={rental.fields.titulo} />
						</ImageSection>
					)}
				</RentalContent>
			)}
		</RentalContainer>
	);
}


// Estilos...

const RentalContainer = styled.section`
    font-size: 60px;
	display: flex;
	flex-direction: column;
	padding: 2rem clamp(1rem, 5vw, 3rem);
	min-height: 100vh;
	width: 100%;
	background-color: #1b5e20;
	color: #ffffff;
	box-sizing: border-box;
	font-family: 'Segoe UI', Roboto, sans-serif;
`;

const ButtonBack = styled.button`
	align-self: flex-start;
	background: transparent;
	color: #ffffff;
	border: 2px solid #ffffff;
	padding: 0.6rem 1.2rem;
	border-radius: 8px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 600;
	transition: all 0.3s ease-in-out;
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;

	&:hover {
		background-color: #ffffff;
		color: #1b5e20;
		transform: scale(1.05);
	}
`;

const RentalContent = styled.div`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	margin-top: 2rem;
	width: 100%;
	gap: 2rem;

	@media (max-width: 900px) {
		flex-direction: column;
		gap: 1.5rem;
	}
`;

const InfoCard = styled.div`
	background: #ffffff;
	color: #1b5e20;
	border-radius: 16px;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	padding: 2rem clamp(1rem, 3vw, 2rem);
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	h1 {
		margin-right: 30px;
		font-size: clamp(1.5rem, 2vw + 1rem, 2rem);
		margin-bottom: 0.5rem;
		color: #1b5e20;
	}
`;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	margin-bottom: 1rem;

	h2 {
		font-size: 1.2rem;
		color: #2e7d32;
	}

	p {
		font-size: 1rem;
		color: #424242;
		line-height: 1.5;
	}
`;

const CaracteristicasList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		background: #1b5e20;
		color: #ffffff;
		padding: 0.4rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		white-space: nowrap;
		transition: background 0.3s;

		&:hover {
			background: #2e7d32;
		}
	}
`;

const ImageSection = styled.div`
	flex: 1.1;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #eeeeee;
	aspect-ratio: 16 / 9;
	position: relative;

	@media (max-width: 768px) {
		width: 100%;
		height: 300px;
		aspect-ratio: unset;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: inherit;
	transition: transform 0.4s ease, filter 0.3s ease;

	${ImageSection}:hover & {
		transform: scale(1.03);
		filter: brightness(0.9);
		cursor: pointer;
	}
`;

const LoadingMessage = styled.h2`
	font-size: 1.2rem;
	margin-top: 2rem;
	color: #ffffff;
	text-align: center;
`;

const ErrorMessage = styled.h2`
	font-size: 1.2rem;
	margin-top: 2rem;
	color: #ff8a80;
	text-align: center;
`;