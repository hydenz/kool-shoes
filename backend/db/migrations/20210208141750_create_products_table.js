
exports.up = function (knex) {
    return knex.schema
        .createTable('products', function (table) {
            table.increments('id');
            table.decimal('old_price', 10, 2);
            table.decimal('new_price', 10, 2).notNullable();
            table.string('name', 40).notNullable();
            table.string('description', 600).notNullable();
            table.string('used_for', 30).notNullable();
            table.string('material', 30).notNullable();
            table.string('category', 30).notNullable();
            table.string('composition', 300).notNullable();
            table.string('footstep_type', 30).notNullable();
            table.string('warranty', 50).notNullable();
            table.string('origin', 30).notNullable();
            table.string('brand', 30).notNullable();
            table.string('images_path', 300).notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('products')
};
