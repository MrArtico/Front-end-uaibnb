import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import NavButton from "./NavButton";

export default function NavigationHeader() {
    const navigate = useNavigate();

    return (
        <Header>
            <Navigation>
                <NavButton
                    textButton="Ver Locações"
                    onClick={() => navigate("/")}
                />
                <NavButton
                    textButton="Ver Caracteristicas"
                    onClick={() => navigate("/characteristics")}
                />
            </Navigation>
        </Header>
    )
}

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 64px;
	padding: 0 2rem;
	background: linear-gradient(90deg, #1e1e1e, #121212);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
	position: sticky;
	top: 0;
	z-index: 10;
`;

const navigationStyles = css`
	display: flex;
	align-items: center;
	gap: 1.2rem;

	button {
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
		font-weight: 500;
		padding: 0.1rem 1.2rem;
		border-radius: 12px;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: white;
			color: black;
		}
	}
`;

const Navigation = styled.nav`
	${navigationStyles}
`;


