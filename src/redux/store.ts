import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { appReducer, productReducer, categoriesReducer, loginReducer, adminReducer } from './reducers';
import {
  getCategoriesSaga,
  getProductsSaga,
  sendOrderInfoTg,
  loginUserSaga,
  registrationUserSaga,
  sendMessageToAuthorSaga,
} from './sagas';
import {
  getProductsAdminSaga,
  changeAccAdminDataSaga,
  getUsersAdminSaga,
  deleteUserAdminSaga,
} from './sagas/AdminSaga';
import { createOrderOnServerSaga, getUsersOrdersSaga } from './sagas/UserSaga/';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    appReducer,
    productReducer,
    categoriesReducer,
    loginReducer,
    adminReducer,
    deleteUserAdminSaga,
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
sagaMiddleware.run(deleteUserAdminSaga);
sagaMiddleware.run(sendMessageToAuthorSaga);
