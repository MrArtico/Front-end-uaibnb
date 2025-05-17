export interface Rental {
	id: string;
	fields: {
		titulo: string;
		descricao: string;
		preco: number;
		cidade: string;
		imagem?: string;
		locacao_caracteristicas?: string[];
	};
	createdTime?: string;
}
