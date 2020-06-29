interface Mesorregiao
{
	id: number;
	nome: string;
	UF: UF;
}

interface Microrregiao
{
	id: number;
	nome: string;
	mesorregiao: Mesorregiao;
}

interface Regiao
{
	id: number;
	sigla: string;
	nome: string;
}

export interface Cidade
{
	id: number;
	nome: string;
	microrregiao: Microrregiao;
}

interface UF
{
	id: number;
	sigla: string;
	nome: string;
	regiao: Regiao;
}



