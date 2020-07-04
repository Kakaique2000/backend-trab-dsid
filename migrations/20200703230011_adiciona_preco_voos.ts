import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  // return knex.schema.alterTable('voo', t => {
  //   t.float('custoPassagem').notNullable().defaultTo(230)
  //   t.string('imgUrl')
  // })
}


export async function down(knex: Knex): Promise<any> {
  
  return knex.schema.alterTable('voo', t => {
    // t.dropColumns('custoPassagem', 'imgUrl')
  })
}

