import { put, takeEvery } from 'redux-saga/effects';

import { ACTIONS_PRODUCTS } from '../constants';

function* getProduct(): any {
  try {
    const response = yield fetch('https://fakestoreapi.com/products');
    const products = yield response.json();

    yield put({
      type: ACTIONS_PRODUCTS.GET_PRODUCTS_SUCCESS,
      products,
    });
  } catch (error) {
    yield put({
      type: ACTIONS_PRODUCTS.GET_PRODUCTS_FAILURE,
      error: error.message,
    });
  }
}

export function* getProductsSaga() {
  yield takeEvery(ACTIONS_PRODUCTS.GET_PRODUCTS, getProduct);
}
