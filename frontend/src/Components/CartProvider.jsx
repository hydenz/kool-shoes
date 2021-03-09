import React, { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import { useLocation } from 'react-router-dom';
import api from '../api';
import { AuthContext } from './AuthProvider';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartContent, setcartContent] = useState();
  const [cartCount, setcartCount] = useState(0);
  // const { enqueueSnackbar } = useSnackbar();
  const { accessToken } = useContext(AuthContext);
  // const location = useLocation();
  const updateCart = async () => {
    if (accessToken) {
      return api
        .get('/cart')
        .then((resp) => {
          setcartContent(
            resp.data.cartContent.length
              ? resp.data.cartContent
              : 'Seu carrinho está vazio'
          );
          setcartCount(resp.data.cartCount);
        })
        .catch((err) => {
          // if (err.response) {
          //   enqueueSnackbar(err.message, { variant: 'error' });
          // }
          setcartContent(err.message);
        });
    }
    setcartContent();
    setcartCount(0);
    return null;
  };

  useEffect(() => {
    updateCart();
  }, [accessToken]);

  return (
    <CartContext.Provider
      value={{
        cartContent,
        setcartContent,
        cartCount,
        setcartCount,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.defaultProps = {
  children: null,
};

CartProvider.propTypes = {
  children: PropTypes.node,
};
