
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('voo', function(t) {
        t.increments('id').primary();
        t.integer('aeroportoOrigemId').references('id').inTable('aeroporto').notNullable().onDelete('cascade')
        t.integer('aeroportoDestinoId').references('id').inTable('aeroporto').notNullable().onDelete('cascade')
        t.timestamp('dataPrevista').notNullable()
        t.integer('limitePassageiros').notNullable().defaultTo(40)
        t.timestamps(true, true)
    })
};

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('voo')
};
