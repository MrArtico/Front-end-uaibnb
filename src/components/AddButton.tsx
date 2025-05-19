import styled from "styled-components";
import { ImPlus } from "react-icons/im";

export default function AddButton({ text, onClick }: { text: string; onClick?: () => void }) {
	return (
		<Button type="button" onClick={onClick}>
			<ButtonText>{text}</ButtonText>
		<ButtonIcon>
		<ImPlus/>
		</ButtonIcon>
		</Button>
	);
}

const Button = styled.button`
	position: relative;
	width: max-content;
	height: 40px;
	cursor: pointer;
	display: flex;
	align-items: center;
	border: 1px solid rgb(0, 0, 0, 0.2);
	background-color: #3aa856;
	border-radius: 10px;
	
	overflow: hidden;
	transition: all 0.3s;

`;

const ButtonText = styled.span`
	color: #fff;
	font-weight: 600;
	transition: all 0.3s;
	width: max-content;
`;

const ButtonIcon = styled.span`
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 100%;
	background-color: #34974d;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
	opacity: 0;
	transform: scale(0.1);
	
	${Button}:hover & {
		opacity: 1;
		transform: scale(1);
	}
`;
