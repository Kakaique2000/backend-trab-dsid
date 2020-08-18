export interface Voo {
    id: number;
    aeroportoOrigemId: number;
    aeroportoDestinoId: number;
    dataPrevista: string;
    limitePassageiros: number;
    imgName: string;
    imgUrl: string;
    cost: number;
}

export interface VooSkyscanner {
    id?: number;
    precoVoo: number;
    aeroportoSaida: string;
    aeroportoChegada: string;
    codigoAeroportoSaida: string;
    codigoAeroportoChegada: string;
    dataSaida: Date;
    dataVolta: Date;
    usuarioId: number;
    created_at?: string;
    updated_at?: string;
    adultos: number;
    criancas: number;
}
