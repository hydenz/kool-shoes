import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import ProductPage from './ProductPage';
import Cart from './Cart';
import { AuthContext } from './AuthProvider';
import Form from './Form';
// import Checkout from "./Checkout"

const Shop = () => {
  const { accessToken } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/shop" exact>
          <ProductList />
        </Route>
        <Route path="/shop/auth" exact>
          {accessToken ? <Redirect to="/shop" /> : <Form />}
        </Route>
        <Route path="/shop/cart" exact>
          {accessToken ? <Cart /> : <Redirect to="/shop/auth" />}
        </Route>
        <Route path="/shop/:productpath">
          <ProductPage />
        </Route>
        {/* <Route path="/shop/checkout" exact>
        TODO... 
        <Checkout />
        </Route> */}
        <Route path="/shop/*">
          <Redirect to="/shop" />
        </Route>
      </Switch>
    </>
  );
};

export default Shop;
