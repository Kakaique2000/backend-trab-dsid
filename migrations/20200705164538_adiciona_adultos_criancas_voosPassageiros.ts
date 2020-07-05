import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable('vooPassageiro', t => {
    t.integer('adultos').defaultTo(1)
    t.integer('criancas').defaultTo(0)
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('vooPassageiro', t => {
    t.dropColumns('adultos', 'criancas')
  })

}

