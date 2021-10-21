import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import CreateTransaction from '@page/create-transaction';
import Home from '@page/home';
import Login from '@page/login';
import PrivateRouteArea from '@component/private-route-area';
import PublicArea from '@component/public-area';
import Register from '@page/register';
import { historyInstance } from '@helper/history';
import registerIcons from '@helper/register-icons';
import { setBaseUrl } from '@helper/custom-axios';

registerIcons();
setBaseUrl();

function App(): JSX.Element {
  return (
    <ConnectedRouter history={historyInstance}>
      <Switch>
        <PrivateRouteArea
          exact
          path="/"
          redirectPath="/home"
          loginPath="/login"
        />
        <PrivateRouteArea path="/home" loginPath="/login" component={Home} />
        <PrivateRouteArea
          path="/create-transaction"
          loginPath="/login"
          component={CreateTransaction}
        />

        <Route path="/login">
          <PublicArea redirectPath="/home" component={Login} />
        </Route>
        <Route path="/register">
          <PublicArea redirectPath="/home" component={Register} />
        </Route>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
