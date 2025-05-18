import type { Rental } from "../rental";

export type RentalInputFields = Omit<
	Rental["fields"],
	"id" | "usuario_criacao" | "usuario_atualizacao" | "nome_caracteristica"
	>;
