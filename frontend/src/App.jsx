import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './Components/AuthProvider';
import { CartProvider } from './Components/CartProvider';
import Intro from './Components/Intro';
import Shop from './Components/Shop';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Intro />
        </Route>
        <Route path="/shop">
          <SnackbarProvider
            maxSnack={1}
            variant="info"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={5000}
          >
            <AuthProvider>
              <CartProvider>
                <Shop />
              </CartProvider>
            </AuthProvider>
          </SnackbarProvider>
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
