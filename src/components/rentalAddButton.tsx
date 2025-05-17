
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function RentalAddButton({to, textButton}: {to: string, textButton: string}) {
	
	const navigate = useNavigate();
	const handleCreateRental = () => {
		navigate(to);
	};

	if(!to) {
		navigate("/");
	}

	return (
		<RentalAddItem onClick={handleCreateRental}>
			<p>{textButton}</p>
		</RentalAddItem>
	);
}

const RentalAddItem = styled.button`
	width: fit-content;
	height: fit-content;
	color: #fff;
	padding: 0rem 0.5rem;
	transition: all 0.1s ease-in-out;
	border-radius: 30px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 10);
	cursor: pointer;
	&:hover {
		background-color: #fff;
		color: var(--card-content-color);
	}
	&:active {
		background-color: #FFD700	;
		border: 2px solid #FFD700;
	}
`;
