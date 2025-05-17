import type { Rental } from "../types/rental";

export function RentalItem({ rental }: { rental: Rental }) {

	const { titulo, descricao, preco, cidade, imagem } = rental.fields;

	return (
		<div key={rental.id}>
			<div>
				<img src={imagem} alt="" />
			</div>
			<h2>{titulo}</h2>
			<p>{descricao}</p>
			<p>
				{Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format(preco)}
			</p>
			<p>{cidade}</p>
		</div>
	);
}

