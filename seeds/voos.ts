import * as Knex from "knex";
import { Voo } from "../src/models/voo";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("voo").del()
        .then(() => {
            // Inserts seed entries
            return knex<Voo>("voo").insert([
                {
                    id: 1,
                    aeroportoOrigemId: 2,
                    aeroportoDestinoId: 1,
                    custoPassagem: 50,
                    limitePassageiros: 40,
                    dataPrevista: new Date(2020, 9, 7, 11, 20).toISOString(),
                    imgUrl: 'https://cw-gbl-gws-prod.azureedge.net/-/media/cw/americas/brazil/office-pages/sao-paulo-mobile.jpg?rev=686a6a5a604e4a7f9edaa027320f58fe'
                },
                {
                    id: 2,
                    aeroportoOrigemId: 2,
                    aeroportoDestinoId: 3,
                    custoPassagem: 200,
                    limitePassageiros: 40,
                    dataPrevista: new Date(2020, 11, 9, 11, 20).toISOString(),
                    imgUrl: 'https://images.almundo.com/205/image/fetch/fl_progressive,q_auto,w_385,h_240,f_jpg/https://almundo-com-res.cloudinary.com/image/fetch/v1528283336/https://am-frontend.s3.amazonaws.com/wp-content/uploads/2016/09/01101806/rio-de-janeiro.jpg',
                },
                {
                    id: 3,
                    aeroportoOrigemId: 1,
                    aeroportoDestinoId: 3,
                    custoPassagem: 220,
                    limitePassageiros: 40,
                    dataPrevista: new Date(2020, 5, 5, 11, 20).toISOString(),
                    imgUrl: 'https://images.almundo.com/205/image/fetch/fl_progressive,q_auto,w_385,h_240,f_jpg/https://almundo-com-res.cloudinary.com/image/fetch/v1528283336/https://am-frontend.s3.amazonaws.com/wp-content/uploads/2016/09/01101806/rio-de-janeiro.jpg',
                },
                {
                    id: 4,
                    aeroportoOrigemId: 2,
                    aeroportoDestinoId: 4,
                    custoPassagem: 546,
                    limitePassageiros: 40,
                    dataPrevista: new Date(2020, 2, 5, 11, 20).toISOString(),
                    imgUrl: 'https://images.almundo.com/205/image/fetch/fl_progressive,q_auto,w_385,h_240,f_jpg/https://almundo-com-res.cloudinary.com/image/fetch/v1589999060/https://s3.amazonaws.com/cvc-bancodeimagens/destinos/porto-seguro-praia-espelho-ba-brasil-divulgacao-cvc.jpg',
                },
                {
                    id: 5,
                    aeroportoOrigemId: 3,
                    aeroportoDestinoId: 4,
                    custoPassagem: 478.90,
                    limitePassageiros: 40,
                    dataPrevista: new Date(2020, 9, 7, 11, 20).toISOString(),
                    imgUrl: 'https://images.almundo.com/205/image/fetch/fl_progressive,q_auto,w_385,h_240,f_jpg/https://almundo-com-res.cloudinary.com/image/fetch/v1589999060/https://s3.amazonaws.com/cvc-bancodeimagens/destinos/porto-seguro-praia-espelho-ba-brasil-divulgacao-cvc.jpg',
                },
            ]);
        });
};
