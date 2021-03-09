import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { useSnackbar } from 'notistack';
import api from '../api';
import { AuthContext } from './AuthProvider';
// import { CartContext } from './CartProvider';
import './Form.scss';
import GrownContainer from './GrownContainer';
import Loading from './Loading';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#2196F3',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#2196F3',
      },
    },
  },
});

const Form = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setaccessToken } = useContext(AuthContext);
  // const { updateCart } = useContext(CartContext);
  const [fadeIn, setfadeIn] = useState(false);
  const [formType, setformType] = useState('login'); // const [isFormLogin, setIsFormLogin] = useState(true)
  const [emailInput, setemailInput] = useState('');
  const [passInput, setpassInput] = useState('');
  const [passConf, setpassConf] = useState('');
  const [submitError, setsubmitError] = useState('');
  const [showLoading, setshowLoading] = useState(false);
  const switchType = (e) => {
    e.preventDefault();
    setformType(formType === 'login' ? 'register' : 'login'); // setIsFormLogin(!isFormLogin)
    setsubmitError('');
  };

  useEffect(() => setfadeIn(true), []);
  const formTitle = formType === 'login' ? 'Login' : 'Cadastro'; // const formTitle = isFormLogin ? "Login" : "Cadastro"
  const emailValidation =
    formType === 'register' && !!emailInput && !emailInput.includes('@');
  // const emailValidation = !isFormLogin && !!emailInput && !emailInput.includes("@")
  const passConfValidation = !!passConf && passInput !== passConf;
  const switchText =
    formType === 'register'
      ? 'Já tem uma conta? Login'
      : 'Não tem uma conta? Cadastrar';
  // const switchText = isFormLogin ? "Não tem uma conta? Cadastrar" : "Não tem uma conta? Cadastrar"
  const isbtnEnabled = () => {
    if (formType === 'login') return emailInput && passInput;
    return (
      emailInput &&
      emailInput.includes('@') &&
      passInput &&
      passConf &&
      passInput === passConf
    );
    // return isFormLogin ? (emailInput && passInput) : (emailInput && emailInput.includes("@") && passInput && passConf && passInput === passConf)
  };

  const submitForm = (e) => {
    e.preventDefault();
    setshowLoading(true);
    const user = { email: emailInput, password: passInput };
    // axios.post(isFormLogin ? "/login" : "/users")
    api
      .post(formType === 'login' ? '/login' : '/users', user)
      .then((resp) => {
        // if (isFormLogin)
        if (formType === 'login') {
          const jwtToken = resp.headers.authorization.split(' ')[1];
          setaccessToken(jwtToken);
          // Já que existe um accessToken, o usuário será redirecionado para /shop
        } else {
          setshowLoading(false);
          setformType('login');
        }
        enqueueSnackbar(resp.data.msg);
      })
      .catch((err) => {
        setshowLoading(false);
        if (err.response) setsubmitError(err.response.data.msg);
        else enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  return (
    <Fade in={fadeIn}>
      <GrownContainer>
        <div className="form-container">
          <div className="form-card">
            <h1 className="form-card__header">{formTitle}</h1>
            <form>
              <div className="form-card__row">
                <TextField
                  error={emailValidation}
                  value={emailInput}
                  classes={classes}
                  onChange={(e) => setemailInput(e.target.value)}
                  required={formType === 'register'}
                  // required={!isFormLogin}
                  id="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
              <div className="form-card__row">
                <TextField
                  value={passInput}
                  classes={classes}
                  onChange={(e) => setpassInput(e.target.value)}
                  required={formType === 'register'}
                  // required={!isFormLogin}
                  id="password"
                  label="Senha"
                  fullWidth
                  margin="normal"
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
              {formType === 'register' && (
                <div className="form-card__row">
                  <TextField
                    error={passConfValidation}
                    value={passConf}
                    required={formType === 'register'}
                    // required={!isFormLogin}
                    onChange={(e) => setpassConf(e.target.value)}
                    classes={classes}
                    id="password-conf"
                    label="Confirmação de senha"
                    fullWidth
                    margin="normal"
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </div>
              )}
              <div className="form-card__row">
                {submitError && <p className="row__errormsg">{submitError}</p>}
                <div style={{ display: 'flex' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isbtnEnabled()}
                    onClick={submitForm}
                    style={{ backgroundColor: '#2196f3' }}
                    type="submit"
                  >
                    {formType}
                  </Button>
                  <button
                    className="row__switchauth"
                    onClick={switchType}
                    type="button"
                  >
                    {switchText}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {showLoading && <Loading style={{ marginTop: '35px' }} />}
        </div>
      </GrownContainer>
    </Fade>
  );
};

export default Form;
