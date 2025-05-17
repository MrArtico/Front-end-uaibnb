import styled from "styled-components";
import type { CharacteristicsItem } from "../models/characteristics";
import textToColor from "../utils/textToColor";

const CharacteristicSelector = ({
  caracteristicas,
  handleCheckboxChange,
}: {
  caracteristicas: CharacteristicsItem[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <PageLetras>
      {caracteristicas.map((caracteristica: CharacteristicsItem) => {
        const id = `caracteristica-${caracteristica.id}`;
        return (
          <StyledItem
            key={caracteristica.id}
            color={textToColor(caracteristica.fields.nome)}
          >
            <input
              id={id}
              type="checkbox"
              name="locacao_caracteristicas"
              value={caracteristica.id}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={id}>{caracteristica.fields.nome}</label>
          </StyledItem>
        );
      })}
    </PageLetras>
  );
};

export default CharacteristicSelector;

const PageLetras = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  min-height: 100px;
  padding: 1rem;
  width: 90%;
  border-radius: 10px;
  background-color: #242424;
  gap: 5px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #4caf50;
    border-radius: 0px 15px 15px 0px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #2e7d32;
  }
`;

const StyledItem = styled.div`
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  overflow: hidden;

  input {
    display: none;
  }

  label {
    display: block;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background 0.2s ease;
  }

  border: 1px solid white;


  border-radius: 10px;
  input:checked + label {
    background-color: ${({ color }) => color}; 
  }

  
`;
