import React, { createContext } from 'react';
import propTypes from 'prop-types';
import api from '../api';
import useLocalStorage from '../Hooks/useLocalStorage';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accessToken, setaccessToken] = useLocalStorage('accessToken');
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return (
    <AuthContext.Provider value={{ accessToken, setaccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.defaultProps = {
  children: null,
};

AuthProvider.propTypes = {
  children: propTypes.node,
};
