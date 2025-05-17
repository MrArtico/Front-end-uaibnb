import RentalList from "../components/rentalList";
import { RentalAddButton } from "../components/rentalAddButton";
import { styled } from "styled-components";

const PrimeDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100dvw;
  gap: 30px;
`;

function Rental() {
  return (
    <PrimeDiv>
      <RentalAddButton textButton="Adicionar Locação" to={"/rental/add"}/>
      <RentalAddButton textButton="Adicionar Caracteristicas" to={"/characteristics/add"}/>
      <RentalList />
    </PrimeDiv>
  );
}

export default Rental;
