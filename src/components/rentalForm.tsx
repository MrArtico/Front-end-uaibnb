import React, { useEffect, useState } from "react";
import { getAllCharacteristics } from "../services/characteristicsService";
import type { CharacteristicsItem } from "../models/characteristics";
import CharacteristicSelector from "./characteristicSelector";
import type { RentalInputFields } from "../models/types/RentalnputFields";
import { createRental } from "../services/rentalService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function RentalForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RentalInputFields>({
        titulo: "",
        descricao: "",
        preco: 0,
        cidade: "",
        locacao_caracteristicas: [],
        imagem: "",
    });

    const [caracteristicas, setCaracteristicas] = useState<CharacteristicsItem[]>([]);

    useEffect(() => {
        async function fetchCaracteristicas() {
            try {
                const response = await getAllCharacteristics();
                setCaracteristicas(response);
            } catch (error) {
                console.error("Erro ao buscar caracteristicas:", error);
            }
        }
        fetchCaracteristicas();
    }, []);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        if (checked) {
            setFormData(
                (
                    prevState: RentalInputFields
                ) => ({
                    ...prevState,
                    locacao_caracteristicas: [
                        ...(prevState.locacao_caracteristicas as string[]),
                        value,
                    ],
                })
            );
        } else {
            setFormData((prevState) => ({
                ...prevState,
                locacao_caracteristicas: (
                    prevState.locacao_caracteristicas as string[]
                ).filter((caracteristica) => caracteristica !== value),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.titulo === "" || formData.descricao === "" || formData.preco === 0 || formData.cidade === "") {
            alert("Preencha todos os campos");
            return;
        }

        if (formData.imagem === "") {
            alert("Selecione uma imagem");
            return;
        }

        formData.preco = Number(formData.preco);


        await createRental(formData as RentalInputFields);
        navigate("/");
        return;

    };


    if (caracteristicas.length === 0) return <p>Carregando...</p>;

    return (
        <PageContainer>
            <h2>Adicionar Locação</h2>
            <FormStyle onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Título"
                />
                <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descrição"
                />
                <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    placeholder="Preço em R$"
                    min={0}
                    step="0.01"
                />
                <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    placeholder="Cidade"
                />
                <input
                    type="text"
                    name="imagem"
                    value={formData.imagem}
                    onChange={handleChange}
                    placeholder="URL da imagem"
                />
                <CharacteristicSelector
                    caracteristicas={caracteristicas}
                    handleCheckboxChange={handleCheckboxChange}
                />
                <button type="submit">Enviar</button>
            </FormStyle>
        </PageContainer>);

};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4CAF50, #2E7D32); // verde claro para escuro
  padding: 2rem;
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;

  input,
  textarea {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #388E3C;
  }
`;
