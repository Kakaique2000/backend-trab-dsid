import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("usuario").del()
        .then(() => {
            // Inserts seed entries
            return knex("usuario").insert([
                {
                    "username": "kakaique2000",
                    "password": "10687732",
                    "email": "kaique.lisboa@gmail.com",
                    "credits": 10000,
                    "born_date": "2020-07-01T00:43:20.666Z",
                    "name": "Kaique Lisboa"
                },
                {
                    "username": "jonatasAlmeida",
                    "password": "joninhasFut",
                    "email": "jonatas.almeida@gmail.com",
                    "credits": 10000,
                    "born_date": "2020-07-01T00:43:20.666Z",
                    "name": "Jonatas Almeida"
                },
                {
                    "username": "admin",
                    "password": "admin1234",
                    "email": "admin@gadmin",
                    "credits": 1000000,
                    "born_date": "2020-07-01T00:43:20.666Z",
                    "name": "Administrador"
                }
            ]);
        });
};
