import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { appReducer, productReducer, categoriesReducer, loginReducer, adminReducer } from './reducers';
import { getCategoriesSaga, getProductsSaga, sendOrderInfoTg, loginUserSaga, registrationUserSaga } from './sagas';
import { getProductsAdminSaga, changeAccAdminDataSaga } from './sagas/AdminSaga';
import { getUsersAdminSaga } from './sagas/AdminSaga/AdminUsersSaga';
import { createOrderOnServerSaga, getUsersOrdersSaga } from './sagas/UserSaga/';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    appReducer,
    productReducer,
    categoriesReducer,
    loginReducer,
    adminReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(getCategoriesSaga);
sagaMiddleware.run(getProductsSaga);
sagaMiddleware.run(sendOrderInfoTg);
sagaMiddleware.run(loginUserSaga);
sagaMiddleware.run(registrationUserSaga);
sagaMiddleware.run(createOrderOnServerSaga);

sagaMiddleware.run(getUsersOrdersSaga);

sagaMiddleware.run(getProductsAdminSaga);
sagaMiddleware.run(getUsersAdminSaga);
sagaMiddleware.run(changeAccAdminDataSaga);
