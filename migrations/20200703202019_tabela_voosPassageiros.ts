
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('vooPassageiro', function(t) {
        t.increments('id').primary();
        t.integer('vooId').references('id').inTable('voo').notNullable().onDelete('cascade')
        t.integer('usuarioId').references('id').inTable('usuario').notNullable().onDelete('cascade')
        t.integer('poltrona').notNullable()
        t.timestamps(true, true)
    })
};

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('vooPassageiro')
};
