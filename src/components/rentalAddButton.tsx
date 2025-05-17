import styled from "styled-components";

const RentalAddButton = ({textButton, onClick}: {textButton: string, onClick: () => void}) => {
	

	

	return (
		<RentalAddItem onClick={onClick}>
			<p>{textButton}</p>
		</RentalAddItem>
	);
};

export default RentalAddButton;

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
    border-color: var(--card-content-color);
  }
  
`;
