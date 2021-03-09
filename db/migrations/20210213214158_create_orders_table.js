
exports.up = function (knex) {
    return knex.schema
        .createTable('orders', function (table) {
            table.increments('id')
            table.integer('user_id').unsigned().notNullable()
            table.integer('product_id').unsigned().notNullable()
            table.unique(['user_id', 'product_id'])
            table.integer('quantity').unsigned().notNullable()
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('orders')
};
