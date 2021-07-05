import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Category } from './Category';
import { Main } from './Main';
export const AppRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route exact path="/category/:category">
          <Category />
        </Route>
      </Switch>
    </>
  );
};
