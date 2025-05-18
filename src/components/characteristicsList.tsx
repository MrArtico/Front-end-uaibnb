import { useEffect, useState } from "react";
import type { CharacteristicsItem } from "../models/characteristics";
import { getAllCharacteristics } from "../services/characteristicsService";
import { useNavigate } from "react-router-dom";

export default function CharacteristicList() {
    const navigate = useNavigate();
    const [characteristics, setCharacteristics] = useState<CharacteristicsItem[]>([]);

    useEffect(()=>{
        async function fetchCharacteristics() {
            try {
                const response = await getAllCharacteristics();
                setCharacteristics(response);
            } catch (error) {
                console.error('Erro ao buscar as caracteristicas:', error);
                navigate('/');
                return;
            }
        }
        fetchCharacteristics();
    }, [navigate]);

    return (characteristics
    );

}