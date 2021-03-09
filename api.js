const express = require('express');
const app = express();
const path = require('path');
const port = process.env.DATABASE_URL || 3001;
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');

app.use(express.json());
app.use(productsRoutes);
app.use(authRoutes);
app.use(ordersRoutes);
app.use(cartRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(
    require('cors')({
      exposedHeaders: 'Authorization',
    })
  );
} else {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`🚀 Server listening at port ${port}!`);
});
