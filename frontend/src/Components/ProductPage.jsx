import React, { useState, useEffect, useContext } from 'react';
import Fade from '@material-ui/core/Fade';
// import { useSnackbar } from 'notistack';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import GrownContainer from './GrownContainer';
import api from '../api';
import { AuthContext } from './AuthProvider';
import { CartContext } from './CartProvider';
import './ProductPage.scss';

const ProductPage = () => {
  const history = useHistory();
  const { productpath } = useParams();
  const [product, setProduct] = useState();
  const [fadeIn, setfadeIn] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    api.get(`/products?images_path=${productpath}`).then((resp) => {
      setProduct(resp.data[0]);
      setfadeIn(true);
    });
  }, []);
  const [currentimgSrc, setcurrentimgSrc] = useState(
    `/assets/shoes-imgs/${productpath}/1.webp`
  );
  // const product = products.find(p => p.images_path === productpath)
  const { accessToken } = useContext(AuthContext);
  const { updateCart } = useContext(CartContext);
  // const { enqueueSnackbar } = useSnackbar();
  const changeimgSrc = (ev) => {
    setcurrentimgSrc(ev.target.src);
  };
  const isSelected = (liNumber) =>
    currentimgSrc.includes(`${liNumber}.webp`) ? 'selected' : '';
  const addtoCart = () => {
    if (accessToken) {
      api.post('/orders', { product_id: product.id }).then((resp) => {
        enqueueSnackbar(resp.data.msg);
        updateCart().then(() => history.push('/shop/cart'));
      });
    }
  };
  const pricetoString = (price) => `R$ ${price.toString().replace('.', ',')}`;
  const percentageDiscount =
    product &&
    product.old_price &&
    (
      (1 - Math.round(product.new_price) / Math.round(product.old_price)) *
      100
    ).toFixed(0);
  const discountTxt =
    product &&
    product.old_price &&
    `Economia de R$ ${(product.old_price - product.new_price)
      .toFixed(2)
      .replace('.', ',')} (${percentageDiscount}%)`;
  return (
    <Fade in={fadeIn}>
      <GrownContainer style={{ display: 'flex', justifyContent: 'center' }}>
        {product ? (
          <div className="product">
            <h1 className="product__name">{product.name}</h1>
            <div className="product__main">
              <ul className="product__pics" aria-label="Fotos do produto">
                <li className={isSelected(1)}>
                  <button
                    onClick={changeimgSrc}
                    type="button"
                    className="pics__btn"
                  >
                    <figure>
                      <img
                        src={`/assets/shoes-imgs/${product.images_path}/1.webp`}
                        alt="1"
                      />
                    </figure>
                  </button>
                </li>
                <li className={isSelected(2)}>
                  <button
                    onClick={changeimgSrc}
                    type="button"
                    className="pics__btn"
                  >
                    <figure>
                      <img
                        src={`/assets/shoes-imgs/${product.images_path}/2.webp`}
                        alt="2"
                      />
                    </figure>
                  </button>
                </li>
                <li className={isSelected(3)}>
                  <button
                    onClick={changeimgSrc}
                    type="button"
                    className="pics__btn"
                  >
                    <figure>
                      <img
                        src={`/assets/shoes-imgs/${product.images_path}/3.webp`}
                        alt="3"
                      />
                    </figure>
                  </button>
                </li>
                <li className={isSelected(4)}>
                  <button
                    onClick={changeimgSrc}
                    type="button"
                    className="pics__btn"
                  >
                    <figure>
                      <img
                        src={`/assets/shoes-imgs/${product.images_path}/4.webp`}
                        alt="4"
                      />
                    </figure>
                  </button>
                </li>
              </ul>
              <div
                style={{
                  backgroundImage: `url(${currentimgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="product__mainimg"
              />
              <div className="product__buy">
                <p className="product__newprice">
                  {pricetoString(product.new_price)}
                </p>
                <p className="product__oldprice">
                  {product.old_price && pricetoString(product.old_price)}
                </p>
                <p className="product__discount">{discountTxt}</p>
                <Link
                  to={accessToken ? '/shop/cart' : '/shop/auth'}
                  onClick={addtoCart}
                  className="product__btn"
                >
                  COMPRAR
                </Link>
              </div>
            </div>
            <div className="product__info">
              <div className="info__divider" />
              <h2 className="info__header">Descrição</h2>
              <p>{product.description}</p>
              <div className="info__features">
                <ul>
                  <li>Nome: {product.name}</li>
                  <li>Gênero: Masculino</li>
                  <li>Indicado para: {product.used_for}</li>
                  <li>Material: {product.material}</li>
                </ul>
                <ul>
                  <li>Categoria: {product.category}</li>
                  <li>Composition: {product.composition}</li>
                </ul>
                <ul>
                  <li>Pisada: {product.footstep_type}</li>
                  <li>Garantia do fabricante: {product.warranty}</li>
                  <li>Origem: {product.origin}</li>
                  <li>Marca: {product.brand}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <h1>Produto não encontrado</h1>
        )}
      </GrownContainer>
    </Fade>
  );
};

export default ProductPage;
