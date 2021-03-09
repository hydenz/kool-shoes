const express = require('express');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig);
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const jwtPass = process.env.JWT_PASS || 'secret_password';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ msg: 'Favor preencher todos os campos de login' });
  knex('users')
    .select()
    .where('email', email)
    .then((resp) => {
      if (!resp.length)
        return res.status(400).json({ msg: 'Usuário ou senha incorretos' });
      let { id } = resp[0];
      let dbPassword = resp[0].password;
      bcrypt.compare(password, dbPassword, (err, success) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            msg:
              'Erro interno no servidor, por favor tente novamente mais tarde',
          });
        }
        if (success) {
          const token = jwt.sign({ id }, jwtPass);
          return res
            .header('Authorization', `Bearer ${token}`)
            .json({ msg: 'Logado com sucesso' });
        }
        return res.status(400).json({ msg: 'Usuário ou senha incorretos' });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        msg: 'Erro interno no servidor, por favor tente novamente mais tarde',
      });
    });
});

router.post('/users', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ msg: 'Por favor preencher todos os campos de registro' });
  knex('users')
    .select()
    .where('email', email)
    .then((resp) => {
      if (resp.length) return res.json({ msg: 'Email já cadastrado' });
      bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            msg:
              'Erro interno no servidor, por favor tente novamente mais tarde',
          });
        }
        return knex('users')
          .insert({ email, password: hash })
          .then((resp) =>
            res.json({ msg: `Usuário cadastrado no email ${email}` })
          );
      });
    });
});

module.exports = router;
