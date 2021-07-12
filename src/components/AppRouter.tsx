import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IStore } from '../redux/constants';
import { AdminPanel } from './AdminPanel';
import { Products } from './AdminPanel/Products/Products';
import { Users } from './AdminPanel/Users/Users';
import { Basket } from './Basket';
import { Category } from './Category';
import { Main } from './Main';
import { UserOrder } from './UserOrders';
export const AppRouter = (): JSX.Element => {
  const isAdminLogin = useSelector((store: IStore) => store.loginReducer.isAdminLogin);
  const isUserLogin = useSelector((store: IStore) => store.loginReducer.isUserLogin);
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
        {isAdminLogin && (
          <>
            <Route exact path="/admin-panel">
              <AdminPanel />
            </Route>
            <Route exact path="/admin-panel/users">
              <Users />
            </Route>
            <Route exact path="/admin-panel/products">
              <Products />
            </Route>
          </>
        )}
        {isUserLogin && (
          <Route path="/orders">
            <UserOrder />
          </Route>
        )}
      </Switch>
    </>
  );
};
