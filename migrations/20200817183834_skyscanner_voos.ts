import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.dropTable('voo');
  return knex.schema.createTable('voo', function(t) {
    t.increments('id').primary();
    t.float('precoVoo').notNullable()
    t.string('aeroportoSaida').notNullable()
    t.string('aeroportoChegada').notNullable()
    t.string('codigoAeroportoSaida').notNullable()
    t.string('codigoAeroportoChegada').notNullable()
    t.integer('usuarioId').notNullable().references('id').inTable('usuario').notNullable().onDelete('cascade')
    t.integer('adultos').notNullable()
    t.integer('criancas').notNullable().defaultTo(1)
    t.date('dataSaida').notNullable()
    t.date('dataVolta').notNullable()
    t.timestamps(true, true)
})
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('voo');
  return knex.schema.createTable('voo', function(t) {
    t.increments('id').primary();
    t.integer('aeroportoOrigemId').references('id').inTable('aeroporto').notNullable().onDelete('cascade')
    t.integer('aeroportoDestinoId').references('id').inTable('aeroporto').notNullable().onDelete('cascade')
    t.timestamp('dataPrevista').notNullable()
    t.timestamp('dataRetorno').notNullable()
    t.string('imgUrl')
    t.float('custoPassagem').notNullable().defaultTo(230)
    t.integer('limitePassageiros').notNullable().defaultTo(40)
    t.timestamps(true, true)
})
}

