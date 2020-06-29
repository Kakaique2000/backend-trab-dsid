export interface AeroportoDto {
	id: number;
	codigo_cidade: number;
	nome: string;
	cnpj: string;
}

export interface AeroportoDetalhadoDto extends AeroportoDto{
	nome_cidade: string;
	codigo_uf: number;
	nome_uf: string;
}