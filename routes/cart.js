const express = require('express');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig);
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();
router.use(authenticateToken);

router.get('/cart', (req, res) => {
  const { id } = req.user;
  knex('products')
    .select(
      'products.name',
      'products.old_price',
      'products.new_price',
      'products.images_path',
      'orders.id as order_id',
      'orders.quantity'
    )
    .innerJoin('orders', 'orders.product_id', 'products.id')
    .where({ user_id: id })
    .then((resp) => {
      const cartContent = resp;
      const cartCount =
        cartContent.length &&
        cartContent
          .map((product) => product.quantity)
          .reduce((prev, current) => prev + current);
      res.send({ cartContent, cartCount });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: 'Erro interno no servidor' });
    });
});

module.exports = router;
