import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import api from '../api';
import { CartContext } from './CartProvider';
import { AuthContext } from './AuthProvider';
import './ProductCard.scss';

const ProductCard = ({ id, name, oldPrice, newPrice, imgsPath }) => {
  const [imgSrc, setimgSrc] = useState(`/assets/shoes-imgs/${imgsPath}/1.webp`);
  const { accessToken } = useContext(AuthContext);
  const { updateCart } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const formatPrice = (price) => `R$ ${price.toString().replace('.', ',')}`;
  const changeimgSrc = () => {
    const newimgSrc = imgSrc.includes('1.webp')
      ? imgSrc.replace('1.webp', '2.webp')
      : imgSrc.replace('2.webp', '1.webp');
    setimgSrc(newimgSrc);
  };
  const addtoCart = () => {
    if (accessToken) {
      api
        .post('/orders', { product_id: id })
        .then((resp) => {
          enqueueSnackbar(resp.data.msg);
          updateCart();
        })
        .catch((err) =>
          enqueueSnackbar(err.message, {
            variant: 'error',
          })
        );
    } else history.push('/shop/auth');
  };
  const getInstallment = (price, installment = 10) => {
    if (installment === 1) return false;
    return price / installment >= 40
      ? `${installment}x de ${formatPrice((price / installment).toFixed(2))}`
      : getInstallment(price, installment - 1);
  };
  const installment = getInstallment(newPrice);
  const discount =
    oldPrice &&
    ((1 - Math.round(newPrice) / Math.round(oldPrice)) * 100).toFixed(0);
  const formattedOldPrice = oldPrice && formatPrice(oldPrice);
  const formattedNewPrice = formatPrice(newPrice);
  return (
    <span className="card">
      <Link to={`/shop/${imgsPath}`}>
        <img
          src={imgSrc}
          width="303"
          height="303"
          onMouseOver={changeimgSrc}
          onFocus={changeimgSrc}
          onMouseOut={changeimgSrc}
          onBlur={changeimgSrc}
          className="card__img"
          alt=""
        />
        {discount && <div className="card__discount">{`-${discount}%`}</div>}
        <p className="card__name">{name}</p>
      </Link>
      <p className="card__freight">FRETE GRÁTIS</p>
      <p className={oldPrice ? 'card__oldprice' : ''}>
        {formattedOldPrice || 'A partir de'}
      </p>
      <p className="card__newprice">{formattedNewPrice}</p>
      {/* <p className="card__installment">{`10x de ${installment}`}</p> */}
      <p className="card__installment">{installment}</p>
      <Button variant="contained" onClick={addtoCart}>
        Adicionar ao carrinho
      </Button>
    </span>
  );
};

ProductCard.defaultProps = {
  oldPrice: false,
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  newPrice: PropTypes.number.isRequired,
  oldPrice: PropTypes.number,
  imgsPath: PropTypes.string.isRequired,
};

export default ProductCard;
