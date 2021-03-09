const shoes = require("./shoes.json")
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert(shoes);
    });
};
