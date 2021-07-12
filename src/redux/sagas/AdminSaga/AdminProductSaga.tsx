import { put, takeEvery } from 'redux-saga/effects';
import { ACTIONS_ADMIN_DATA } from '../../constants';

function* getProducts(): any {
  try {
    const response = yield fetch('https://fakestoreapi.com/products');
    const productsList = yield response.json() as string[];

    yield put({
      type: ACTIONS_ADMIN_DATA.GET_PRODUCTS_SUCCESS_ADMIN,
      productsList,
    });
  } catch (error) {
    yield put({
      type: ACTIONS_ADMIN_DATA.GET_PRODUCTS_FAILURE_ADMIN,
      error: error.message,
    });
  }
}

export function* getProductsAdminSaga() {
  yield takeEvery(ACTIONS_ADMIN_DATA.GET_PRODUCTS_ADMIN, getProducts);
}
