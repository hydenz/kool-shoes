import React, { useContext, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/Delete';
import GrownContainer from './GrownContainer';
import './Cart.scss';
import api from '../api';
import { CartContext } from './CartProvider';
import Loading from './Loading';

const Cart = () => {
  const { cartContent, setcartContent, updateCart } = useContext(CartContext);
  const [fadeIn, setfadeIn] = useState(false);
  const formatPrice = (price) => price.toFixed(2).replace('.', ',');
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setcartContent();
    updateCart();
    setfadeIn(true);
  }, []);
  const clearCart = (orderID) => {
    api
      .delete(`/orders/${orderID || ''}`)
      .then((resp) => {
        updateCart();
        enqueueSnackbar(resp.data.msg);
      })
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
  };
  const changeQuantity = (orderID, type, quantity) => {
    let newQuantity = quantity;
    switch (type) {
      case 'INCREASE':
        newQuantity += 1;
        break;
      case 'DECREASE':
        newQuantity -= 1;
        break;
      default:
    }
    api
      .patch(`/orders/${orderID}`, { quantity: newQuantity })
      .then(() => updateCart())
      .catch((err) => enqueueSnackbar(err.message, { variant: 'error' }));
  };
  return (
    <Fade in={fadeIn}>
      <GrownContainer>
        <div className="cart-content">
          {Array.isArray(cartContent) && cartContent.length ? (
            <>
              <div className="cart">
                <div className="cart__title">
                  <h2>Meu carrinho</h2>
                  <Button
                    variant="outlined"
                    onClick={() => clearCart()}
                    startIcon={<DeleteIcon />}
                  >
                    Limpar carrinho
                  </Button>
                </div>
                {cartContent.map((product) => (
                  <div className="cart__item" key={product.order_id}>
                    <div className="item__details">
                      <Link
                        to={`/shop/${product.images_path}`}
                        className="details__link"
                      >
                        <img
                          src={`/assets/shoes-imgs/${product.images_path}/1.webp`}
                          alt="Imagem do Tênis"
                        />
                      </Link>
                      <div className="details__info">
                        <h3>{product.name}</h3>
                        <p>Vendido e entregue por Kool Shoes</p>
                        <p>Preço un.: R$ {formatPrice(product.new_price)}</p>
                      </div>
                      <DeleteRoundedIcon
                        className="details__remove"
                        onClick={() => clearCart(product.order_id)}
                      />
                    </div>
                    <div className="item__controller">
                      <div className="controller__qtt">
                        <span>Qtde:</span>
                        <button
                          aria-label="diminuir a quantidade"
                          type="button"
                          disabled={product.quantity === 1}
                          onClick={() =>
                            changeQuantity(
                              product.order_id,
                              'DECREASE',
                              product.quantity
                            )
                          }
                          style={{
                            backgroundImage:
                              "url('/assets/svg/decreasebtn.svg')",
                          }}
                        />
                        <input
                          aria-label="quantidade do produto"
                          readOnly
                          type="text"
                          value={product.quantity}
                        />
                        <button
                          aria-label="aumentar a quantidade"
                          type="button"
                          disabled={product.quantity === 4}
                          onClick={() =>
                            changeQuantity(
                              product.order_id,
                              'INCREASE',
                              product.quantity
                            )
                          }
                          style={{
                            backgroundImage:
                              "url('/assets/svg/increasebtn.svg')",
                          }}
                        />
                      </div>
                      <div className="controller__prices">
                        <p className="prices__old">
                          {product.old_price &&
                            `R$ ${formatPrice(
                              product.old_price * product.quantity
                            )}`}
                        </p>
                        <p className="prices__new">
                          R$ {formatPrice(product.new_price * product.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h2>Resumo da compra</h2>
                <div className="summary">
                  <div className="summary__total">
                    <span>Valor total</span>
                    <span>
                      R${' '}
                      {formatPrice(
                        cartContent
                          .map(
                            (product) => product.new_price * product.quantity
                          )
                          .reduce((prev, current) => prev + current)
                      )}
                    </span>
                  </div>
                  {cartContent.some((product) => product.old_price) && (
                    <div className="summary__economy">
                      <div className="economy">
                        <MonetizationOnRoundedIcon />
                        <span>
                          VOCÊ ESTÁ ECONOMIZANDO R${' '}
                          {formatPrice(
                            cartContent
                              .map((product) =>
                                product.old_price
                                  ? (product.old_price - product.new_price) *
                                    product.quantity
                                  : 0
                              )
                              .reduce((prev, current) => prev + current)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="summary__actions">
                    <Link to="/shop/checkout" className="actions__checkout">
                      CONTINUAR
                    </Link>
                    <Link to="/shop" className="actions__shop">
                      ESCOLHER MAIS PRODUTOS
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="emptycart">
              {cartContent && (
                <h1 className="emptycart__error">{cartContent}</h1>
              )}
              {!cartContent && <Loading />}
            </div>
          )}
        </div>
      </GrownContainer>
    </Fade>
  );
};

export default Cart;
