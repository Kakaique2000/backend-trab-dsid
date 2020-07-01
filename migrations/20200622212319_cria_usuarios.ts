
import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('usuario', function(t) {
        t.increments('id').primary()
        t.string('username').notNullable()
        t.string('name').notNullable()
        t.string('email').notNullable()
        t.string('password').notNullable()
        t.float('credits').notNullable().defaultTo(0)
        t.date('born_date').notNullable()
        t.timestamps(true, true)
    })
};

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('usuario')
};
