import axios from 'axios';

const axiosConfig =
  process.env.NODE_ENV === 'development'
    ? { baseURL: 'http://localhost:3001' }
    : {};

const api = axios.create(axiosConfig);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const newError = error;
    let errorMsg;
    if (error.response) errorMsg = error.response.data.msg;
    else if (error.request) errorMsg = 'Servidor indisponível';
    else errorMsg = 'Ocorreu um erro em sua requisição';
    newError.message = errorMsg;
    // if (error.response)
    //   enqueueSnackbar(error.response.data.msg, { variant: 'error' });
    // else if (error.request)
    //   enqueueSnackbar('Servidor indisponível', { variant: 'error' });
    // else
    //   enqueueSnackbar('Ocorreu um erro em sua requisição', {
    //     variant: 'error',
    //   });
    return Promise.reject(newError);
  }
);

export default api;
