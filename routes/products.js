const express = require('express');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig);
const router = express.Router();

//GETS products from DB
router.get('/products', (req, res) => {
  knex('products')
    .select()
    .then((products) => {
      if (req.query.name) {
        products = products.filter((product) => {
          const name = req.query.name.toLowerCase();
          return product.name.toLowerCase().includes(name);
        });
      } else if (req.query.id) {
        products = products.filter((product) => {
          const ids = req.query.id;
          return ids.includes(product.id.toString());
        });
      } else if (req.query.images_path) {
        products = products.filter(
          (product) => product.images_path === req.query.images_path
        );
      }
      return products.length
        ? res.send(products)
        : res.json({ msg: 'Nenhum produto foi encontrado com esse nome' });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: 'Erro interno no servidor' });
    });
});

module.exports = router;
