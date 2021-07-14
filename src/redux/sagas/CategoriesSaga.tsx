import { put, takeEvery } from 'redux-saga/effects';

import { ACTIONS_CATEGORIES } from '../constants';

function* getCategories(): any {
  try {
    const response = yield fetch('https://fakestoreapi.com/products/categories');
    const categories = yield response.json() as string[];

    yield put({
      type: ACTIONS_CATEGORIES.GET_CATEGORIES_SUCCESS,
      categories,
    });
  } catch (error) {
    yield put({
      type: ACTIONS_CATEGORIES.GET_CATEGORIES_FAILURE,
      error: error.message,
    });
  }
}

export function* getCategoriesSaga() {
  yield takeEvery(ACTIONS_CATEGORIES.GET_CATEGORIES, getCategories);
}
