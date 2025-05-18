import styled from "styled-components";

const NavButton = ({textButton, onClick}: {textButton: string, onClick: () => void}) => {

	return (
		<ActionButton onClick={onClick}>
			<p>{textButton}</p>
		</ActionButton>
	);
};

export default NavButton;

const ActionButton = styled.button`
	color: #fff;
	padding: 0rem 0.5rem;
	transition: all 0.1s ease-in-out;
	cursor: pointer;
	background-color: var(--secondary-color);
	border-radius: 5px;
	border: none;
`;
