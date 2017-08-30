/* @flow */
import * as React from 'react';
import glamorous, { Div } from 'glamorous';
import GraphiQl from './GraphiQl';
import { Switch, Route, Link } from 'react-router-dom';
// $ExpectError
import AppBar from 'material-ui/AppBar';
// $ExpectError
import Toolbar from 'material-ui/Toolbar';
// $ExpectError
import Button from 'material-ui/Button';
import QRDrinkersList from './components/Drinkers/QRDrinkersList';
import QRDrinker from './components/Drinker/QRDrinker';

import env from './relay/env';

const Header = glamorous.div({});

const Footer = glamorous.div({
  height: '2rem',
  backgroundColor: '#3f51b5',
});

const app = () =>
  <Div display="flex" flex="1" flexDirection="column">
    <Header>
      <AppBar position="static">
        <Toolbar>
          <Link to={'/'}>
            <Button color="contrast">Main</Button>
          </Link>

          <Div marginLeft="auto" />
          <Link to={'/graphiql'}>
            <Button color="contrast">GraphiQl</Button>
          </Link>
          <Button onClick={() => console.log('store:', env.getStore())}>
            Log Store
          </Button>
        </Toolbar>
      </AppBar>
    </Header>
    <Div flex="1">
      <Switch>
        <Route path="/graphiql" component={GraphiQl} />
        <Route path="/" component={QRDrinkersList} />
      </Switch>
      <Route path="/drinker/:drinkerId" component={QRDrinker} />
    </Div>
    <Footer />
  </Div>;

export default app;
