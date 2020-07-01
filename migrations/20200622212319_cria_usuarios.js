
exports.up = function(knex) {
    return knex.schema.createTable('usuario', function(t) {
        t.increments('id').primary()
        t.string('username').notNullable()
        t.string('email').notNullable()
        t.string('password').notNullable()
        t.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuario')
};
