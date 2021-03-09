const express = require('express');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig);
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();
router.use(authenticateToken);

// POST user order on DB
router.post('/orders', (req, res) => {
  const { id } = req.user;
  const { product_id } = req.body;
  knex
    .raw(
      `INSERT INTO orders (user_id,product_id,quantity) VALUES (${id},${product_id},1)` // \
      // ON DUPLICATE KEY UPDATE quantity=IF(quantity<4, quantity+1, 4);`
    )
    .then((resp) => res.json({ msg: 'Adicionado ao carrinho com sucesso' }))
    .catch(
      (err) => {
        if (err.errno === 1062) {
          return res.json({ msg: 'Produto já existente no carrinho' });
        }
        return res
          .status(500)
          .json({ msg: 'Erro no servidor ao adicionar produto' });
      }
      // res.send("Erro no servidor ao adicionar produto")
    );
});

// Gets orders from user
router.get('/orders', (req, res) => {
  const { id } = req.user;
  knex('orders')
    .select(['product_id', 'quantity'])
    .where({ user_id: id })
    .then((resp) => res.send(resp));
});

// Deletes order by order_id
router.delete('/orders/:order_id', (req, res) => {
  const { order_id } = req.params;
  if (order_id) {
    knex('orders')
      .delete()
      .where({ id: order_id })
      .then((resp) =>
        res.json({ msg: 'Produto deletado do carrinho com sucesso' })
      )
      .catch((err) => res.json({ msg: 'Erro ao processar sua requisição' }));
  }
});

// Deletes all user's order
router.delete('/orders', (req, res) => {
  const user_id = req.user.id;
  knex('orders')
    .delete()
    .where({ user_id })
    .then((resp) => res.json({ msg: 'Carrinho deletado com sucesso' }))
    .catch((err) => res.json({ msg: 'Erro ao processar sua requisição' }));
});

// Updates order quantity by ID
router.patch('/orders/:order_id', (req, res) => {
  const { order_id } = req.params;
  const { quantity } = req.body;
  if (quantity < 1 || quantity > 4) {
    return res.json({ msg: 'Quantidade de produto inválida' });
  }
  knex('orders')
    .update({ quantity })
    .where({ id: order_id })
    .then((resp) => res.json({ msg: 'Ordem alterada com sucesso' }))
    .catch((err) => res.json({ msg: 'Erro no servidor' }));
});

module.exports = router;
