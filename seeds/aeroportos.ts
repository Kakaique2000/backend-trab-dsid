import * as Knex from "knex";
import { Aeroporto } from "../src/models/aeroporto";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("aeroporto").del()
        .then(() => {
            // Inserts seed entries
            return knex<Aeroporto>("aeroporto").insert([
                {
                    id: 1,
                    cep: '12345678',
                    cidade: 'São Paulo',
                    codigo_cidade: '456',
                    endereco: 'Rua 1234',
                    nome: 'aeroporto de Congonhas'
                },
                {
                    id: 2,
                    cep: '12312312',
                    cidade: 'São Paulo',
                    codigo_cidade: '456',
                    endereco: 'Rua 1234',
                    nome: 'aeroporto de Guarulhos'
                },
            ]);
        });
};
