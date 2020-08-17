import * as Knex from "knex";
import { Aeroporto } from "../models/aeroporto";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("aeroporto").del()
        .then(() => {
            // Inserts seed entries
            return knex<any>("aeroporto").insert([
                {
                    id: 1,
                    cep: '12345678',
                    cidade: 'São Paulo',
                    codigo_cidade: '456',
                    endereco: 'Rua 1234',
                    nome: 'Aeroporto de Congonhas'
                },
                {
                    id: 2,
                    cep: '12312312',
                    cidade: 'São Paulo',
                    codigo_cidade: '456',
                    endereco: 'Rua 1234',
                    nome: 'Aeroporto de Guarulhos'
                },
                {
                    id: 3,
                    cep: '21941-900',
                    cidade: 'Rio de Janeiro',
                    codigo_cidade: '456',
                    endereco: 'Av. Vinte de Janeiro, s/nº - Ilha do Governador, Rio de Janeiro - RJ',
                    nome: ' Aeroporto Internacional Tom Jobim'
                },
                {
                    id: 4,
                    cep: '45810-000',
                    cidade: 'Porto Seguro',
                    codigo_cidade: '456',
                    endereco: 'Estr. do Aeroporto, S/N - Cidade Alta, Porto Seguro - BA',
                    nome: 'Aeroporto Internacional de Porto Seguro'
                },
            ]);
        });
};
