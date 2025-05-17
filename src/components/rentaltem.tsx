import styled from "styled-components";
import type { Rental } from "../types/rental";
import { GoGear } from "react-icons/go";

export function RentalItem({ rental }: { rental: Rental }) {
	const { titulo, preco, cidade, imagem } = rental.fields;

	return (
		<RentalContainer key={rental.id}>
			<RentalCity>{cidade}</RentalCity>
			<Image width={300} src={imagem} alt={titulo} />
			<RentalDetails>
				<RentalTitle>{titulo}</RentalTitle>

				<RentalFooter>
					<RentalPrice>
						{Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(preco)}
					</RentalPrice>

					<RentalOptions>
						<GoGear size={20}/>
					</RentalOptions>
				</RentalFooter>
			</RentalDetails>
		</RentalContainer>
	);
}

const RentalPrice = styled.div`
	background-color: var(--card-content-color);
	color: #fff;
	padding: 0.3rem 0.5rem;
	border-radius: var(--card-border-radius);
`;

const RentalOptions = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;
	height: fit-content;
	background-color: var(--card-content-color);
	color: #fff;
	padding: 0.3rem;
	border-radius: var(--card-border-radius);
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #fff;
		color: var(--card-content-color);
	}
`;

const RentalFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: auto;
	width: calc(var(--card-width) - 1rem);
	height: 40px;
	border-radius: 10px;
`;

const RentalDetails = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 5px;
	gap: 1px;
	bottom: 0px;
	width: 100%;
`;

const RentalContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: var(--card-width);
	height: var(--card-height);
	border-radius: var(--card-border-radius);
	background-color: var(--card-background);
	box-shadow: var(--card-box-shadow);
	position: relative;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	object-position: 65%;
	border-radius: var(--card-border-radius);
`;

const RentalTitle = styled.p`
	position: relative;
	font-size: 1.1rem;
	background-color: var(--card-content-color);
	color: #fff;
	font-weight: 700;
	width: 100%;
	margin: 0;
	padding: 0.4rem 0.7rem;
	border-radius: 10px;
	width: calc(var(--card-width) - 2rem);

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const RentalCity = styled.p`
	font-size: 1rem;
	position: absolute;
	border-radius: var(--card-border-radius);
	background-color: var(--card-content-color);
	color: white;
	font-weight: bold;
	text-align: left;
	padding: 0.3rem 0.5rem;
	margin: 0;
	top: 10px;
	left: 10px;
`;
