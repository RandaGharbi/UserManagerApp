import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import * as ROUTES from './constants/routes';
import Layout from './shared/Layout'
import PrivateRoute from './shared/utils/privateroute'
import LoginStackRoute from './shared/utils/loginroute'
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UserListPage from './pages/usersList';

const App = () => (
  <Router>
    <Layout>
      <div>
        <PrivateRoute exact path={ROUTES.MAIN} component={UserListPage} />
        <LoginStackRoute path={ROUTES.LOGIN} component={LoginPage} />
        <LoginStackRoute path={ROUTES.REGISTER} component={RegisterPage} />
      </div>
    </Layout>
  </Router>
);

export default App;
