import styled from "styled-components";
import type { Rental } from "../models/rental";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export function RentalItem({ rental }: { rental: Rental }) {
  const { titulo, preco, cidade, imagem } = rental.fields;
  const navigate = useNavigate();

  return (
    <RentalContainer
      key={rental.id}
      onClick={() => navigate(`/rental/${rental.id}`)}
    >
      <RentalCity>{cidade}</RentalCity>
      <Image width={300} src={imagem} alt={titulo} />
      <RentalDetails>
        <RentalTitle title={titulo}>{titulo}</RentalTitle>

        <RentalFooter>
          <RentalPrice>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(preco)}
          </RentalPrice>

          <RentalOptions onClick={() => navigate(`/rental/edit/${rental.id}`)}>
            <GoGear size={20} />
          </RentalOptions>
        </RentalFooter>
      </RentalDetails>
    </RentalContainer>
  );
}

const RentalPrice = styled.div`
  font-size: 0.9rem;
  color: #7fff00;
  background-color: rgba(0, 0, 0, 0.65);
  padding: 0.3rem 0.6rem;
  border-radius: 10px;
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
`;

const RentalDetails = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
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
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  margin-bottom: 0.3rem;
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
