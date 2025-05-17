import React, { useEffect, useState } from "react";
import { getAllCharacteristics } from "../../services/characteristicsService";
import type { CharacteristicsItem } from "../../models/characteristics";
import CharacteristicSelector from "../characteristicSelector";
import type { RentalInputFields } from "../../models/types/RentalnputFields";
import { createRental } from "../../services/rentalService";
import styled from "styled-components";

export default function RentalForm() {
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

        
        const response = await createRental(formData as RentalInputFields);
    };


    if (caracteristicas.length === 0) return <p>Carregando...</p>;

    return (
        <>
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

                <button type="submit" style={{ marginTop: "1rem" }}>
                    Enviar
                </button>
            </FormStyle>

           

            {/* Pré-visualização */}
            {/* {formData.imagem && (
                <div style={{ marginTop: "1rem" }}>
                    <p>Pré-visualização:</p>
                    <img
                        src={formData.imagem}
                        alt="Pré-visualização"
                        style={{ width: 200, borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </div>
            )} */}
        </>
    );
};

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 600px) {
        padding: 1rem;
        max-width: 100%;
    }
`;
