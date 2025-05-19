import styled from "styled-components";
import type { CharacteristicsItem } from "../models/characteristics";
import textToColor from "../utils/textToColor";

const CharacteristicSelector = ({
  caracteristicas,
  handleCheckboxChange,
  checkedCaracteristicas,
}: {
  caracteristicas: CharacteristicsItem[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedCaracteristicas: string[];
}) => {
  return (
    <PageLetras>
      {caracteristicas.map((caracteristica: CharacteristicsItem) => {
        const realID = caracteristica.fields?.locacao_caracteristicas?.[0] || caracteristica.id
        const id = `caracteristica-${realID}`;


        return (
          <StyledItem
            key={realID}
            color={textToColor(caracteristica.fields.nome)}
          >
            <input
              id={id}
              type="checkbox"
              name="locacao_caracteristicas"
              value={realID}
              onChange={handleCheckboxChange}
              checked={checkedCaracteristicas?.includes(realID)}
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
    background: var(--secondary-color);                               
    border-radius: 0px 15px 15px 0px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
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
