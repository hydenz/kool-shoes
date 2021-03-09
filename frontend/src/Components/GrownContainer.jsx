import React from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

const GrownContainer = ({ children, style }) => (
  <Container style={{ flexGrow: '1000', ...style }}>{children}</Container>
);

export default GrownContainer;

GrownContainer.defaultProps = {
  children: null,
  style: null,
};

GrownContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.objectOf(PropTypes.string),
};
