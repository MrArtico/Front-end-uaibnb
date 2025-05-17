import { useParams, useNavigate } from "react-router-dom";
// import Characteristics from "./characteristics";

export default function RentalDetails() {
    const { cidade } = useParams<{ cidade: string }>();
    const navigate = useNavigate();

    if (!cidade) {
        return (
            <div style={{
                margin: "2rem auto",
                maxWidth: 500,
                background: "#f5f5f5",
                padding: "2rem",
                borderRadius: "12px",
                border: "1px solid #e0e0e0"
            }}>
                <h2>Nenhuma localidade selecionada...</h2>
                <button onClick={() => navigate(-1)}>Voltar</button>
            </div>
        );
    }

    return (
        <div style={{
            margin: "2rem auto",
            maxWidth: 500,
            background: "#f5f5f5",
            padding: "2rem",
            borderRadius: "12px",
            border: "1px solid #e0e0e0"
        }}>
            {/* <Characteristics cidade={cidade} /> */}
            <button onClick={() => navigate("/")} style={{ marginTop: "1rem" }}>
                Voltar
            </button>
        </div>
    );
}