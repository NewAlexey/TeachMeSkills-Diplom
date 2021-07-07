import { Redirect, Route, Switch } from 'react-router-dom';
import { Basket } from './Basket';
import { Category } from './Category';
import { Main } from './Main';
export const AppRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <Route exact path="/main">
          <Main />
        </Route>
        <Route exact path="/category/:category">
          <Category />
        </Route>
        <Route exact path="/basket">
          <Basket />
        </Route>
      </Switch>
    </>
  );
};
