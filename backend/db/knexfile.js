// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: process.env.DATABASE_URL || {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: "kool_shoes",
  }
};