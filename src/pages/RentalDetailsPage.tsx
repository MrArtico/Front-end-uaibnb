import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Rental } from "../models/rental";
import { getRentalById } from "../services/rentalService";
import styled from "styled-components";

// import Characteristics from "./characteristics";

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
				const response = await getRentalById(id);
				if (isMounted) setRental(response);
			} catch (error) {
				console.error(error);
				if (isMounted) navigate("/");
			}
		};

		fetchRental();

		return () => {
			isMounted = false;
		};
	}, [navigate, id]);

	return (
    <RentalContainer>
        <ButtonBack onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>
            Voltar
        </ButtonBack>
        {loading && <h2>Loading...</h2>}
        {error && <h2 style={{ color: "#d32f2f" }}>{error}</h2>}
        {!loading && rental && (
            <div>
                <h1>{rental.fields.titulo}</h1>
                <h2>Descrição</h2>
                <p>{rental.fields.descricao}</p>
                <h2>Preço</h2>
                <p>R$ {rental.fields.preco}</p>
                <h2>Cidade</h2>
                <p>{rental.fields.cidade}</p>
            </div>
        )}
		</RentalContainer >
	);
}

// Estilos...

const RentalContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	background-color: #f7f7f7;
	min-height: 100vh;

`

const ButtonBack = styled.button`
	margin-top: 1.5rem;
	background: #f0f0f0;
	border: none;
	padding: 0.75rem 1.25rem;
	border-radius: 8px;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background-color: #e0e0e0;
	}
`;
