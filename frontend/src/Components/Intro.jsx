import React from 'react';
import './Intro.scss';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';

const Intro = () => (
  <Box
    bgcolor="#2196F3"
    display="flex"
    justifyContent="center"
    alignItems="center"
    overflow="auto"
    width="100%"
    height="100%"
  >
    <div className="intro">
      <img
        src="/assets/svg/logo.svg"
        alt="Logo"
        draggable="false"
        className="intro__logo"
      />
      <p className="intro__title intro__text">KOOL SHOES</p>
      <p className="intro__slogan intro__text">
        CALÇADOS MODERNOS E CONFORTÁVEIS
      </p>
      {/* <Link to="/shop"> */}
      <Button className="intro__btn" href="/shop">
        LOJA
      </Button>
      {/* </Link> */}
    </div>
  </Box>
);

export default Intro;
