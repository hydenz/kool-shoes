import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './Loading.scss';
import PropTypes from 'prop-types';

const Loading = ({ style }) => (
  <CircularProgress classes={{ root: 'loading' }} size={false} style={style} />
);

export default Loading;

Loading.defaultProps = {
  style: null,
};

Loading.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
};
