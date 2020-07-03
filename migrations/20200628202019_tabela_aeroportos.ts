
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('aeroporto', function(t) {
        t.increments('id').primary()
        t.string('codigo_cidade').notNullable()
        t.string('cidade').notNullable()
        t.string('endereco').notNullable()
        t.string('nome').notNullable()
        t.string('cep').notNullable().unique()
        t.timestamps(true, true)
    })
};

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('aeroporto')
};
