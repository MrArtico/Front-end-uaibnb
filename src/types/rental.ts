import type { user } from "./user";

export interface Rental {
	id: string;
	createdTime?: string | Date;
	fields: {
		id: number;
		titulo: string;
		descricao: string;
		preco: number;
		cidade: string;
        usuario_criacao?: user;
        usuario_atualizacao?: user;
		locacao_caracteristicas?: string[];
		imagem?: string;
        nome_caracteristica: string[];
	};
}
