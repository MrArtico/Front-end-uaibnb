import type { user } from "./user";

export interface CharacteristicsItem {
	id: string; 
	createdTime: string;
	fields: {
		id: number;
		nome: string;
		descricao: string;
		usuario_criacao: user;
		usuario_atualizacao: user;
		locacao_caracteristicas: string[]; 
		nome_caracteristica: string[];
	};
}

export type CharacteristicsUpdate = {
  records: {
    id: string;
    fields: Omit<Pick<CharacteristicsItem, 'fields'>['fields'], 'nome_caracteristica'  | 'id' |  'usuario_criacao' | 'usuario_atualizacao'>;
  }[];
};
