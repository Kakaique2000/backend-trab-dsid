
exports.up = function(knex) {
    return knex.schema.createTable('aeroporto', function(t) {
        t.increments('id').primary()
        t.string('codigo_cidade').notNullable()
        t.string('nome').notNullable()
        t.string('cnpj').notNullable().unique()
        t.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('aeroporto')
};
