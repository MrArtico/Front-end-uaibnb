import styled from "styled-components";
import { RiCloseLargeFill } from "react-icons/ri";

export default function CloseFormutton({ onClick, id }: { onClick: (id?: string) => void; id?: string }) {
	return (
		<CloseIcon>
			<RiCloseLargeFill onClick={() => onClick(id)} size={30} />
		</CloseIcon>
	);
}

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;