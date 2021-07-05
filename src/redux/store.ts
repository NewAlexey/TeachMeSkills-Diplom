import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { appReducer, productReducer, categoriesReducer } from './reducers';
import { getCategoriesSaga, getProductsSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    appReducer,
    productReducer,
    categoriesReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(getCategoriesSaga);
sagaMiddleware.run(getProductsSaga);
