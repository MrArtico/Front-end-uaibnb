import styled from "styled-components";
import type { Rental } from "../../models/rental";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export function RentalItem({ rental, handleEditRental }: { rental: Rental,  handleEditRental: (id: string) => void}) {
  const { titulo, preco, cidade, imagem } = rental.fields;
  const navigate = useNavigate();

  return (
    <RentalContainer
      key={rental.id}
      onClick={() => navigate(`/rental/${rental.id}`)}
    >
      <RentalCity>{cidade}</RentalCity>
      <Image width={300} src={imagem} alt={titulo} />
      <RentalTitle title={titulo}>{titulo}</RentalTitle>
      <RentalUtils>
        <RentalPrice>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(preco)}
        </RentalPrice>
        <RentalOptions
          onClick={(e) => {
            e.stopPropagation();
            handleEditRental(rental.id)
          }}
        >
          <GoGear size={20} />
        </RentalOptions>
      </RentalUtils>
    </RentalContainer>
  );
}

const RentalPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
`;

const RentalUtils = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 2;
  gap: 5px;
`;

const RentalOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2); 
  padding: 0.3rem;
  border-radius: 8px;
  color: #fff;
  transition: all 0.2s;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const RentalContainer = styled.div`
  position: relative;
  width: var(--card-width);
  height: var(--card-height); 
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
  background-color: #000;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 90%);
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  object-position: 65% 0%;
  border-radius: var(--card-border-radius);
  transition: transform 0.3s ease, object-position 3s ease;
  
  ${RentalContainer}:hover & {
    transform: scale(1.10);
    object-position: 100% 65%;
  }
`;


const RentalTitle = styled.p`
  font-size: 1rem;
  position: absolute;
  bottom: 3rem;
  left: 12px;
  right: 12px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 2;
`;

const RentalCity = styled.p`
  position: absolute;
  top: 0.4rem;
  left: 0.7rem;
  padding: 0.3rem 0.8rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  font-size: 0.85rem;
  z-index: 2;
`;
