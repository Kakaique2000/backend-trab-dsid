export interface Voo {
    id: number;
    aeroportoOrigemId: number;
    aeroportoDestinoId: number;
    dataPrevista: string;
    dataRetorno: string;
    limitePassageiros: number;
    imgName: string;
    imgUrl: string;
    custoPassagem: number;
}