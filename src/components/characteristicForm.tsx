import { useNavigate } from "react-router-dom";
import type { CharacteristicsItem } from "../models/characteristics";
import { useState } from "react";
import { createCharacteristics } from "../services/characteristicsService";

export default function CharacteristicForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Pick<CharacteristicsItem["fields"], "nome" | "descricao">>({
        nome: "",
        descricao: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value })); 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!formData.nome || !formData.descricao) {
            alert("Preencha todos os campos");
            return;
        }

        await createCharacteristics(formData);
        navigate("/characteristics");
        return;
    };

    return (
        <div>
            <h2>Adicionar Caracteristica</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                </div>
                <div>
                    <label>Descricao:</label>
                    <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );



}
