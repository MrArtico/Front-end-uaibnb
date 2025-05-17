import styled from "styled-components";
import type { CharacteristicsItem } from "../models/characteristics";

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
        return (
          <div key={caracteristica.id}>
            <input
              id={caracteristica.id}
              type="checkbox"
              name="locacao_caracteristicas"
              value={caracteristica.id}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`caracteristica-${caracteristica.id}`}>
              {caracteristica.fields.nome}
            </label>
          </div>
        );
      })}
    </PageLetras>
  );
};

export default CharacteristicSelector;

const PageLetras = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100px;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  padding: 2rem;
`;
