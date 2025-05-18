import RentalList from "../components/rentalList";
import { styled } from "styled-components";
import { useState } from "react";
import RentalForm from "../components/rentalForm";
import RentalAddButton from "../components/rentalAddButton";



function Rental() {
  const [addRental, setAddRental] = useState(false);

  const handleAddRental = () => {
    setAddRental(!addRental);
  };

  return (
    <PrimeDiv>
      <RentalAddButton
        textButton="Adicionar Locação"
        onClick={handleAddRental}
      />
      <RentalAddButton
        textButton="Adicionar Caracteristicas"
        onClick={handleAddRental}
      />
      <RentalList />

      {addRental && <RentalForm onClick={handleAddRental} />}
    </PrimeDiv>
  );
}

export default Rental;

const PrimeDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100dvw;
  gap: 30px;
`;