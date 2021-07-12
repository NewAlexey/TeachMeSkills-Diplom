import { put, takeEvery } from 'redux-saga/effects';
import { IUserOrder } from '../../../utils/interfaces';
import { urlNow } from '../../../utils/settings-file';

import { ACTIONS_APP } from '../../constants';
import { IActionInterface } from '../../reducers';

function* getUserOrders(action: IActionInterface): any {
  const userEmail = yield action.userEmail;
  try {
    const responseServer = yield fetch(`${urlNow}users/${userEmail}`);
    const userOrders = (yield responseServer.json()) as IUserOrder[];
    if (userOrders.length > 0) {
      yield put({
        type: ACTIONS_APP.GET_USER_ORDERS_SUCCESS,
        userOrders,
      });
    } else {
      throw Error('No orders yet.');
    }
  } catch (error) {
    yield put({
      type: ACTIONS_APP.GET_USER_ORDERS_FAILURE,
      error: error.message,
    });
  }
}

export function* getUsersOrdersSaga() {
  yield takeEvery(ACTIONS_APP.GET_USER_ORDERS, getUserOrders);
}
