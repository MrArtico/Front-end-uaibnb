import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRentalById, updateRental } from "../services/rentalService";
import type { RentalInputFields } from "../models/types/RentalnputFields";

export default function FormEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RentalInputFields>({
    titulo: "",
    descricao: "",
    preco: 0,
    cidade: "",
    locacao_caracteristicas: [],
    imagem: "",
  });

  useEffect(() => {
    if (!id) return;
    async function fetchRentalDetails(id: string) {
      try {
        const response = await getRentalById(id);
        setFormData(response.fields as RentalInputFields);
      } catch (error) {
        console.error("Erro ao buscar caracteristicas:", error);
        navigate("/");
        return;
      }
    }
    fetchRentalDetails(id);
  }, [id, navigate]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.titulo === "" ||
      formData.descricao === "" ||
      formData.preco === 0 ||
      formData.cidade === ""
    ) {
      alert("Preencha todos os campos");
      return;
    }

    if (formData.imagem === "") {
      alert("Selecione uma imagem");
      return;
    }
	formData.preco = Number(formData.preco);	
    const response = await updateRental(id as string, formData);

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="number"
          name="preco"
          value={formData.preco}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Cidade:</label>
        <input
          type="text"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Imagem URL:</label>
        <input
          type="text"
          name="imagem"
          value={formData.imagem}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
