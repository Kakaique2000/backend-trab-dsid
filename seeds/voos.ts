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
                    aeroportoDestinoId: 1,
                    aeroportoOrigemId: 2,
                    custoPassagem: 200,
                    dataPrevista: new Date(2020, 9, 7, 11, 20).toISOString(),
                    imgUrl: 'https://cw-gbl-gws-prod.azureedge.net/-/media/cw/americas/brazil/office-pages/sao-paulo-mobile.jpg?rev=686a6a5a604e4a7f9edaa027320f58fe'

                },
            ]);
        });
};
