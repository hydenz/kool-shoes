import React, { useState, useEffect } from 'react';
import Fade from '@material-ui/core/Fade';
import GrownContainer from './GrownContainer';
import api from '../api';
import ProductCard from './ProductCard';
import useQuery from '../Hooks/useQuery';
import './ProductList.scss';
import Loading from './Loading';

const ProductList = () => {
  const [content, setContent] = useState(
    <div className="prodlist-center">
      <Loading />
    </div>
  );
  const [fadeIn, setfadeIn] = useState(false);
  const query = useQuery();
  const productQuery = query.get('name');
  useEffect(() => {
    setfadeIn(true);
    api
      .get(`/products${productQuery ? `?name=${productQuery}` : ''}`)
      .then((resp) => {
        const newContent = resp.data.length ? (
          resp.data.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              id={product.id}
              oldPrice={product.old_price}
              newPrice={product.new_price}
              imgsPath={product.images_path}
            />
          ))
        ) : (
          <h1>{resp.data.msg}</h1>
        );
        setContent(
          <div className="prodlist">
            <h1 className="prodlist__header">Calçados masculinos</h1>
            <div className="prodlist__products">{newContent}</div>
          </div>
        );
      })
      .catch((err) => {
        setContent(<h1>{err.message}</h1>);
      });
  }, [productQuery]);
  return (
    <Fade in={fadeIn}>
      <GrownContainer style={{ maxWidth: '1019px' }}>{content}</GrownContainer>
    </Fade>
  );
};

export default ProductList;
